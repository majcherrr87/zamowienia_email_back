export interface NewAdEntity extends Omit<AdEntity, 'id_contractor'>{
    id_contractor?: string;
}
export interface AdEntity_simple {
    name_contractor: string;
}
export interface AdEntity extends AdEntity_simple{
    id_contractor?: string;
    email_contractor: string;
    address_contractor: string;
    phone_contractor: string;
}
