import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs";
import {TitrePro} from "../_models/titre-pro";

@Injectable({
  providedIn: 'root'
})
export class TitreProService {

  contoller_url = '/titrePro'

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private httpClient:HttpClient) { }

  getAllByPage(page: number,size:number){
    return this.httpClient.get<TitrePro[]>(`${environment.apiUrl}/${this.contoller_url}/${page-1}/${size}`);
  }

  getSearch(page:number, size:number, search:string){

    return this.httpClient.get<TitrePro[]>(`${environment.apiUrl}/${this.contoller_url}/name/${page-1}/${size}/${search}`);
  }

  findById(id:number){
    return this.httpClient.get<TitrePro>(`${environment.apiUrl}/${this.contoller_url}/${id}`)
      .pipe(map(titreFound => {return titreFound;}));
  }

  getCount(){
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.contoller_url}/count`);
  }

  delete(element: number) {
    return this.httpClient.delete(`${environment.apiUrl}/${this.contoller_url}/${element}`);
  }

  save(titre:TitrePro){
    return this.httpClient.post<any>(`${environment.apiUrl}/${this.contoller_url}`, titre, this.httpHeaders)
      .pipe(map(savedTitre => {return savedTitre}));
  }

  update(titre:TitrePro){
    return this.httpClient.put<any>(`${environment.apiUrl}/${this.contoller_url}`, titre, this.httpHeaders)
      .pipe(map(savedTitre => {return savedTitre}));
  }
}
