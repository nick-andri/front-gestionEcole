export interface Niveaux {

  id:number;
  version:number;
  valeur:number;
  description:string;
  codeCouleurHexa:string;

}

export const baseNiveaux: Niveaux={
  id:0,
  version:0,
  valeur:0,
  description:'',
  codeCouleurHexa:''
}
