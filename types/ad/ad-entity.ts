export interface NewAdEntity extends Omit<AdEntity, 'id_contractor'>{
    id_contractor?: string;
}

export interface AdEntity {
    id_contractor: string;
    name_contractor: string;
    email_contractor: string;
}