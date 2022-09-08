import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs";
import {Ville} from "../_models/ville";

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  contoller_url = '/ville'

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private httpClient:HttpClient) { }

  getAllByPage(page: number,size:number){
    return this.httpClient.get<Ville[]>(`${environment.apiUrl}/${this.contoller_url}/${page}/${size}`);
  }

  getSearch(page:number, size:number, search:string){

    return this.httpClient.get<Ville[]>(`${environment.apiUrl}/${this.contoller_url}/${page-1}/${size}/${search}`);
  }

  findById(id:number){
    return this.httpClient.get<Ville>(`${environment.apiUrl}/${this.contoller_url}/${id}`)
      .pipe(map(villeFound => {return villeFound;}));
  }

  getCount(){
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.contoller_url}/count`);
  }

  delete(element: number) {
    return this.httpClient.delete(`${environment.apiUrl}/${this.contoller_url}/${element}`);
  }

  save(ville:Ville){
    return this.httpClient.post<any>(`${environment.apiUrl}/${this.contoller_url}`, ville, this.httpHeaders)
      .pipe(map(savedTitre => {return savedTitre}));
  }

  update(ville:Ville){
    return this.httpClient.put<any>(`${environment.apiUrl}/${this.contoller_url}`, ville, this.httpHeaders)
      .pipe(map(savedTitre => {return savedTitre}));
  }
}
