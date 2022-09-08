export class User {

  id:number;
  prenom:string;
  nom:string;
  email:string;
  password:string;
  active:boolean;
  role:string;
  version:number;
  imagePath:string;

  constructor(){
    this.id=0;
    this.prenom= '';
    this.nom = '';
    this.email= '';
    this.password='';
    this.active=false;
    this.role='';
    this.version=0;
    this.imagePath='';

  }
}
