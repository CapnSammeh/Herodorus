import { Entity, Column, PrimaryColumn, JoinTable, ManyToMany } from "typeorm";
import { UserDetail } from "../UserDetail/UserDetail";

@Entity()
export class SongDetail {

    @PrimaryColumn()
    song_id: number;

    @ManyToMany(() => UserDetail)
    @JoinTable({
        name: "songs_by_user",
        joinColumn: {
            name: "song_id",
            referencedColumnName: "song_id"
        },
        inverseJoinColumn: {
            name: "user",
            referencedColumnName: "user_id"
        }
    })
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