import { Entity, Column, PrimaryColumn, Index } from "typeorm";
// import { UserDetail } from "../UserDetail/UserDetail";
import { ISession } from "connect-typeorm";

@Entity()
export class SessionDetail implements ISession {

    @Index()
    @Column("bigint")
    public expiredAt = Date.now();

    @PrimaryColumn("varchar", { length: 255 })
    public id = "";
   
    @Column("text")
    public json = "";

    // @ManyToOne(() => UserDetail, user => user.sessions)
    // user: UserDetail 
}