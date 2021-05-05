import fetch from 'node-fetch';
import { SongDetail } from '../db/entity/SongDetail/SongDetail';
import { UserDetail } from "../db/entity/UserDetail/UserDetail";
import { UserRepository } from '../db/entity/UserDetail/UserRepository';
import { getCustomRepository, getManager, getRepository } from 'typeorm';
import { URLSearchParams } from 'url';

import dotenv from 'dotenv';
dotenv.config();

async function spotifyGetTrack(accessToken: string, trackID: string) {
    const request = await fetch(
        'https://api.spotify.com/v1/tracks/' + trackID, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
        }
    }
    ).then(res => res.json());
    return await request;
}

export async function getSongInformation(user: Express.User, songID: string) {
    const dbUser: UserDetail = user as UserDetail;
    const request = spotifyGetTrack(dbUser.access_token, songID);
    return await request;
}

export async function getTenSongs(user: Express.User) {
    const dbUser: UserDetail = user as UserDetail;
    if (dbUser) {
        const request = await fetch(
            "https://api.spotify.com/v1/me/player/recently-played?limit=10", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + dbUser.access_token,
            }
        })
        if (request.status == 502) {
            //Attempt to run again, we had a timeout.
            console.log("Connection Timeout");
            await getTenSongs(user);
        } else if (request.status == 401) {
            //Wait some time before trying again
            await updateSpotifyAccessToken(user);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await getTenSongs(user);
        } else {
            //Process the content
            const songText = await request.text();
            if (songText) {
                //The Spotify API will return invalid JSON if there's nothing here, so we have to compensate by putting in a text => json check
                const songList = JSON.parse(songText);
                for (var songData of songList.items) {
                    const song: Omit<SongDetail, "song_id"> = {
                        album_art: songData.track.album.images[0].url,
                        spotify_song_id: songData.track.id,
                        artist_name: songData.track.album.artists[0].name,
                        album_name: songData.track.album.name,
                        song_title: songData.track.name,
                        played_datetime: songData.played_at,
                        popularity: songData.track.popularity,
                        release_date: songData.track.album.release_date,
                        user_: dbUser
                    }
                    //TODO: This needs to be refactored
                    getManager().createQueryBuilder()
                        .insert()
                        .into(SongDetail)
                        .values([song])
                        .onConflict(`DO NOTHING`)
                        .execute();
                }
            }
        }
    };
}

export async function getCurrentSong(user: Express.User) {
    //Good example of Long-Polling
    const appUser = user as UserDetail
    const userDetail = getRepository(UserDetail);
    const dbUser = await userDetail.findOne(appUser.user_id);
    if (dbUser) {
        const request = await fetch(
            'https://api.spotify.com/v1/me/player', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + dbUser.access_token,
            }
        })
        if (request.status == 502) {
            console.log("Connection Timeout");
            await getCurrentSong(user);
        } else if (request.status == 401) {
            console.log("401 Error");
            await updateSpotifyAccessToken(user);
            await new Promise(resolve => setTimeout(resolve, 1000));
            await getCurrentSong(user);
        } else {
            const songText = await request.text();
            if (songText) {
                //The Spotify API will return invalid JSON if there's nothing here, so we have to compensate by putting in a text => json check
                const songList = JSON.parse(songText);
                const songData = await spotifyGetTrack(dbUser.access_token, songList.item.id);
                const song: Omit<SongDetail, 'song_id'> = {
                    album_art: songData.album.images[0].url,
                    spotify_song_id: songData.id,
                    artist_name: songData.album.artists[0].name,
                    album_name: songData.album.name,
                    song_title: songData.name,
                    played_datetime: new Date(),
                    popularity: songData.popularity,
                    release_date: songData.album.release_date,
                    user_: dbUser
                }
                getManager().createQueryBuilder()
                    .insert()
                    .into(SongDetail)
                    .values([song])
                    .onConflict(`DO NOTHING`)
                    .execute();
            }
        }
    }
}

export async function updateSpotifyAccessToken(user: Express.User) {
    const dbUser: UserDetail = user as UserDetail;
    const authHeader = 'Basic ' + Buffer.from(process.env.SPOTIFY_CLIENT_ID as string + ":" + process.env.SPOTIFY_CLIENT_SECRET as string).toString('base64');
    (async () => {
        try {
            const data = new URLSearchParams();
            data.append('grant_type', 'refresh_token');
            data.append('refresh_token', dbUser.refresh_token);
            console.log("Calling Spotify");
            const request = await fetch(
                'https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': authHeader
                },
                body: data
            })
            if (request.status == 502) {
                console.log("Connection Timeout");
                await updateSpotifyAccessToken(user);
            } else {
                const response = await request.json();
                const userRepository = getCustomRepository(UserRepository);
                if (response.access_token) {
                    userRepository.updateAccessToken(dbUser.user_id, response.access_token);
                } else {
                    console.log("It's cooked");
                }
            }
        } catch (e) {
            //We don't do anything yet
            console.log(e);
        }
    })();
}