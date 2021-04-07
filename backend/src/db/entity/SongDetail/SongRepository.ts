import { EntityRepository, Repository, } from "typeorm";
import { SongDetail } from "./SongDetail";

@EntityRepository(SongDetail)
export class SongRepository extends Repository<SongDetail>{

}