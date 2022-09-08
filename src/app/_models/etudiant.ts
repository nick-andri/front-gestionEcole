export interface Etudiant {

    id:number;
     nom:string;
     prenom:string;
     email:string;
     password:string;
     role:string;
     version:number;
    active:boolean;
    imagePath:string;
  promotionsId:number[];
}

export const baseEtudiant :Etudiant ={

  id:0,
  nom:"",
  prenom:"",
  email:"",
  password:"",
  role:"",
  version:0,
  active:true,
  imagePath:"",
  promotionsId:[]
  }
