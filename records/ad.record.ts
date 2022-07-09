import {AdEntity, AdEntity_simple} from "../types";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';


type AdRecordResult = [AdEntity[], FieldPacket[]];
type AdRecordResult_simple = [AdEntity_simple[], FieldPacket[]];

export class AdRecord implements AdEntity {
    id_contractor?: string;
    name_contractor: string;
    email_contractor: string;
    address_contractor: string;
    phone_contractor: string;


    constructor(obj: AdEntity) {

        this.id_contractor = obj.id_contractor;
        this.name_contractor = obj.name_contractor;
        this.email_contractor = obj.email_contractor;
        this.address_contractor = obj.address_contractor;
        this.phone_contractor = obj.phone_contractor;

    }
     static async getOne(id_contractor: string): Promise<AdRecord | null> {
       const [results] = await pool.execute("SELECT * FROM `contractor` WHERE `id_contractor` = :id_contractor",{
           id_contractor,
       }) as AdRecordResult;
       return results.length === 0 ? null : new AdRecord(results[0]);
     }

     static async getAll(): Promise<AdEntity_simple[]> {
        const [results] = await pool.execute('SELECT * FROM `contractor`') as AdRecordResult_simple;
        return results
     }
     async insert(): Promise<void>{
        if(!this.id_contractor){
            this.id_contractor = uuid();
        }else{
            throw new Error('Cannot insert something that is already inserted')
        }
        await pool.execute('INSERT INTO `contractor` (`id_contractor`, `name_contractor`, `email_contractor`, `address_contractor`, `phone_contractor`) VALUES (:id_contractor, :name_contractor, :email_contractor, :address_contractor, :address_contractor)', this);
     }

}