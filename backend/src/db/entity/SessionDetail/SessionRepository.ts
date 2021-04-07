import { EntityRepository, Repository, } from "typeorm";
import { SessionDetail } from "./SessionDetail";

@EntityRepository(SessionDetail)
export class SessionRepository extends Repository<SessionDetail>{

}