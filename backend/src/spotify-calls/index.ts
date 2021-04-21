import fetch from 'node-fetch';
import { SongDetail } from '../db/entity/SongDetail/SongDetail';
import { UserDetail } from "../db/entity/UserDetail/UserDetail";
import { getManager } from 'typeorm';

export async function getTenSongs(user: Express.User) {
    const dbUser: UserDetail = user as UserDetail;
    const songs = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=10", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + dbUser.access_token,
        }
        //TODO: If this thing fails because of a forbidden error, it means we've probably got a bum access token; we need to generate a new one. 
    }
    ).then(res => res.json())

    for (var singleSong of songs.items) {
        const song: Omit<SongDetail, "song_id"> = {
            album_art: singleSong.track.album.images[0].url,
            spotify_song_id: singleSong.track.id,
            artist_name: singleSong.track.album.artists[0].name,
            album_name: singleSong.track.album.name,
            song_title: singleSong.track.name,
            played_datetime: singleSong.played_at,
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
    const dbUser: UserDetail = user as UserDetail;
    const song = await fetch(
        'https://api.spotify.com/v1/me/player', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + dbUser.access_token,
            }
        }
    ).then(res => res.json());

    console.log(song);
}