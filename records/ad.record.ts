import {AdEntity} from "../types";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";


type AdRecordResult = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
    id_contractor: string;
    name_contractor: string;
    email_contractor: string;


    constructor(obj: AdEntity) {

        this.id_contractor = obj.id_contractor;
        this.name_contractor = obj.name_contractor;
        this.email_contractor = obj.email_contractor;

    }
     static async getOne(id_contractor: string): Promise<AdRecord | null> {
       const [results] = await pool.execute("SELECT * FROM `contractor` WHERE id_contractor = :id_contractor",{
           id_contractor,
       }) as AdRecordResult;
       return results.length === 0 ? null : new AdRecord(results[0]);
     }

}