import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { UserDetail } from "../UserDetail/UserDetail";

@Entity()
export class SongDetail {

    @PrimaryColumn()
    song_id: number;

    @ManyToOne(() => UserDetail)
    user_: UserDetail;

    @Column()
    song_title: string;

    @Column()
    artist_name: string;

    @Column()
    album_name: string;

    @Column()
    album_art: string;
}