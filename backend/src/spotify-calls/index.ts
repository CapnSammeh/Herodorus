import fetch from 'node-fetch';
import { SongDetail } from '../db/entity/SongDetail/SongDetail';
import { UserDetail } from "../db/entity/UserDetail/UserDetail";
import { getCustomRepository, getManager } from 'typeorm';
import { UserRepository } from '../db/entity/UserDetail/UserRepository';

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
    const request = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=10", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + dbUser.access_token,
        }
        //TODO: If this thing fails because of a forbidden error, it means we've probably got a bum access token; we need to generate a new one. 
    }
    ).then(res => res.json())

    for (var songData of request.items) {
        const song: Omit<SongDetail, "song_id"> = {
            album_art: songData.track.album.images[0].url,
            spotify_song_id: songData.track.id,
            artist_name: songData.track.album.artists[0].name,
            album_name: songData.track.album.name,
            song_title: songData.track.name,
            played_datetime: songData.played_at,
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

export async function getCurrentSong(user: Express.User) {
    //Good example of Long-Polling
    const dbUser: UserDetail = user as UserDetail;
    (async () => {
        try {
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
                const userRepository = getCustomRepository(UserRepository);
                userRepository.updateAccessToken(dbUser.user_id, dbUser.access_token);
                //TODO: Need to refresh the user's access token, then recall;
                await new Promise(resolve => setTimeout(resolve, 1000));
                await getCurrentSong(user);
            } else {
                const songData = await request.json();
                const songInformation = await spotifyGetTrack(dbUser.access_token, songData.item.id);
                const song: Omit<SongDetail, 'song_id'> = {
                    album_art: songInformation.album.images[0].url,
                    spotify_song_id: songInformation.id,
                    artist_name: songInformation.album.artists[0].name,
                    album_name: songInformation.album.name,
                    song_title: songInformation.name,
                    played_datetime: new Date(),
                    user_: dbUser
                }
                //TODO: This needs to be refactored
                getManager().createQueryBuilder()
                    .insert()
                    .into(SongDetail)
                    .values([song])
                    .onConflict(`DO NOTHING`)
                    .execute();
                await getCurrentSong(user);
            }
        } catch (e) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            await getCurrentSong(user);
        }
    })();
}