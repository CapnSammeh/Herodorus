import fetch from 'node-fetch';
import { SongDetail } from '../db/entity/SongDetail/SongDetail';
import { UserDetail } from "../db/entity/UserDetail/UserDetail";
import { getConnection } from 'typeorm';

export async function getTenSongs(user: Express.User) {
    const dbUser: UserDetail = user as UserDetail;
    //Clear the songs in the DB for the current user
    const db = await getConnection();
    db.createQueryBuilder()
        .delete()
        .from(SongDetail)
        .where("user_ = :user", { user: dbUser.user_id })
        .execute();

    const songs = await fetch(
        "https://api.spotify.com/v1/me/player/recently-played?limit=10", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + dbUser.access_token,
        }
    }
    ).then(res => res.json())

    for (var singleSong of songs.items) {
        const song: Omit<SongDetail, "song_id"> = {
            album_art: singleSong.track.album.images[0].url,
            spotify_song_id: singleSong.track.id,
            artist_name: singleSong.track.album.artists[0].name,
            album_name: singleSong.track.album.name,
            song_title: singleSong.track.name,
            user_: dbUser
        }

        db.createQueryBuilder()
            .insert()
            .into(SongDetail)
            .values([song])
            .onConflict(`DO NOTHING`)
            .execute();
    }
}