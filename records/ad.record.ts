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
    id_product?: string
    name_product: string
    choice_packaging: string;


    constructor(obj: AdEntity) {

        this.id_contractor = obj.id_contractor;
        this.name_contractor = obj.name_contractor;
        this.email_contractor = obj.email_contractor;
        this.address_contractor = obj.address_contractor;
        this.phone_contractor = obj.phone_contractor;
        this.id_product = obj.id_product;
        this.name_product = obj.name_product;
        this.choice_packaging = obj.choice_packaging;


    }
     static async getOne(id_contractor: string): Promise<AdRecord | null> {
       const [results] = await pool.execute("SELECT * FROM `contractor` WHERE `id_contractor` = :id_contractor",{
           id_contractor,
       }) as AdRecordResult;
       return results.length === 0 ? null : new AdRecord(results[0]);
     }

     static async getAll(): Promise<AdEntity_simple[]> {
        const [results] = await pool.execute('SELECT * FROM `contractor` ORDER BY `name_contractor`') as AdRecordResult_simple;
        return results
     }
    static async getAllProduct(id_contractor: string): Promise<AdEntity_simple[]> {

        const [results] = await pool.execute("SELECT `id_product`,`name_product`, `choice_packaging` FROM `products` WHERE `id_contractor` = :id_contractor",{id_contractor}) as AdRecordResult_simple;
        return results
    }


     async insert(): Promise<void>{
        if(!this.id_contractor){
            this.id_contractor = uuid();
        }else{
            throw new Error('Cannot insert something that is already inserted')
        }
        await pool.execute('INSERT INTO `contractor` (`id_contractor`, `name_contractor`, `email_contractor`, `address_contractor`, `phone_contractor`) VALUES (:id_contractor, :name_contractor, :email_contractor, :address_contractor, :phone_contractor)', this);
     }
    async insertProduct(): Promise<void>{
        if(!this.id_product){
            this.id_product = uuid();
        }else{
            throw new Error('Cannot insert something that is already inserted')
        }
        await pool.execute("INSERT INTO `products` (`id_product`, `name_product`, `choice_packaging`, `id_contractor`) VALUES (:id_product, :name_product, :choice_packaging,  :id_contractor)", this);
    }
     static async delete(id_contractor: string) {
        const [results] = await pool.execute("DELETE FROM `contractor` WHERE `id_contractor`  = :id_contractor",{
            id_contractor,
        }) ;
        return results;
    }
    static async deleteProduct(id_product: string) {
        const [results] = await pool.execute("DELETE FROM `products` WHERE `id_product`  = :id_product",{
            id_product,
        }) ;
        return results;
    }
     async update() {
        const [results] = await pool.execute("UPDATE `contractor` SET `name_contractor`= :name_contractor, `email_contractor` = :email_contractor, `address_contractor` = :address_contractor, `phone_contractor` = :phone_contractor WHERE `id_contractor`  = :id_contractor", this) ;
        return results;
    }
    async updateProduct() {
        const [results] = await pool.execute("UPDATE `products` SET `name_product`= :name_product, `choice_packaging` = :choice_packaging  WHERE `id_product` = :id_product", this) ;
        return results;
    }

}