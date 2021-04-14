import fetch from 'node-fetch';
import { SongDetail } from '../db/entity/SongDetail/SongDetail';
import { UserDetail } from "../db/entity/UserDetail/UserDetail";
import { getConnection } from 'typeorm';

export async function getTenSongs(user: Express.User) {
    const dbUser: UserDetail = user as UserDetail;
    //Clear the songs in the DB for the current user
    //TODO: Fix this up, notes below
    /*
        Not sure this is the best way to go about this

        Actually I'm almost certain it isn't.

        The idea here is that the user should have 10 songs loaded up, ready to go, that way if they're not currently playing anything, we can fall back to cycling through those. 
        By deleting what's in the db, we give ourselves the chance to populate some more recent songs so we're not showing anything super stale, but again, is that the idea here?
        The arbitriary 10-song-limit was just something I considered appropriate, could be modified. 

        
    */
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