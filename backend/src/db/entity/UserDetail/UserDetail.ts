import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserDetail {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    spotify_id: string;

    @Column()
    email: string;

    @Column()
    display_name: string;

    @Column()
    access_token: string;

    @Column()
    refresh_token: string;
}