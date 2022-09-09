import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Etudiant} from "../../_models/etudiant";
import {environment} from "../../../environments/environment";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  contoller_url = '/Etudiant'

  API:string = `${environment.apiUrl}/${this.contoller_url}/`;



  private httpHeaders = {
    headers : new HttpHeaders({
      'Access-Control-Allow-Origin':'*'
    })
  }

  constructor(private http :HttpClient) { }


  getAll(){
    return this.http.get<Etudiant[]>(this.API);
  }

  getAllByPage(page:number,size:number){
    return this.http.get<Etudiant[]>(this.API+`${page}/${size}`);
  }

  getAllByPromo(page:number,size:number,promoId:number){
    return this.http.get<Etudiant[]>(this.API+`${page}/${size}/promo/${promoId}`);
  }

  save(etudiant:Etudiant){
    return this.http.post<any>(this.API,etudiant,this.httpHeaders)
      .pipe(map(saveEtu => {return saveEtu}));
  }

  update(etudiant:Etudiant){
    return this.http.put<any>(this.API,etudiant,this.httpHeaders)
      .pipe(map(saveEtu => {return saveEtu}));
  }

  count() {
    return this.http.get<number>(this.API+'/count');
  }

  getAllByName(page: number, size: number, search: string) {
    return this.http.get<Etudiant[]>(this.API+`${page}/${size}/${search}`);
  }

delete(id:number){
    return this.http.delete(this.API+`${id}`);
}
}
