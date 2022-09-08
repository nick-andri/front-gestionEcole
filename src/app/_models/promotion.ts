import {Ville} from "./ville";
import {TitrePro} from "./titre-pro";

export interface Promotion {

  id:number;
  description:String;
  version:number;
   dateDebut:Date;
   dateFin:Date;
  titreProfessionnelId:number;
  villeId:number;
  etudiantsId:number[];
}
export const basePromotion:Promotion={
  id:0,
  description:"",
  version:0,
  dateDebut:new Date(),
  dateFin:new Date(),
  titreProfessionnelId:0,
  villeId:0,
  etudiantsId:[],
}

export interface PromotionDto{
  id:number,
  dateDebut:Date;
  dateFin:Date;
  titreProfessionnelNom:String;
  villeNom:String;
}

export const basePromotionDto:PromotionDto={
  id:0,
  dateDebut:new Date(),
  dateFin:new Date(),
  titreProfessionnelNom:"",
  villeNom:""
}


