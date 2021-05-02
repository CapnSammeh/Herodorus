import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserDetail } from "../UserDetail/UserDetail";

@Entity()
export class SongDetail {

    @PrimaryGeneratedColumn()
    song_id: number;

    @Column({nullable: false, unique: true})
    spotify_song_id: string;

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
    
    @Column()
    release_date: Date;

    @Column()
    popularity: Number
    
    @Column()
    played_datetime: Date;
    
}