import { EntityRepository, Repository, } from "typeorm";
import { SongDetail } from "./SongDetail";

@EntityRepository(SongDetail)
export class SongRepository extends Repository<SongDetail>{
    async createSong(song: Omit<SongDetail, "song_id">) {
        return song;
    }

    async newSong(song: SongDetail){
        const songQuery = await this.createQueryBuilder()
            .select("song_detail")
            .from(SongDetail, "song_detail")
            .where("song_detail_song_id = :song_id", { song_id: song.song_id})
            .getOne();
        if(!songQuery){
            console.log("No existing song in DB");
            return this.save(song);
        } else {
            return null;
        }
    }

    async getCurrentSong(user_id: number) {
        const userSong = await this.createQueryBuilder()
            .select("song_detail")
            .from(SongDetail, "song_detail")
            .where("song_detail.user_userId = :user_id", { user_id: user_id })
            .getOne();
        if (!userSong) {
            console.log("No Song Information for the specified user");
            return null;
        }
        return userSong;
    }

    async getAllSongs(user_id: number) {
        const userSongs = await this.createQueryBuilder()
            .select("song_detail")
            .from(SongDetail, "song_detail")
            .where("song_detail.user_userId = :user_id", { user_id: user_id })
            .getMany();
        if (!userSongs) {
            console.log("No songs for the specified user");
            return null;
        }
        return userSongs;
    }


}