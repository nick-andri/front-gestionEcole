import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs";
import {Promotion} from "../_models/promotion";

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  contoller_url = '/Promo'

  private httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*'
    })
  }

  constructor(private httpClient:HttpClient) { }

  getAllByPage(page: number,size:number){
    return this.httpClient.get<Promotion[]>(`${environment.apiUrl}/${this.contoller_url}/${page}/${size}`);
  }

  getSearch(page:number, size:number, search:string){

    return this.httpClient.get<Promotion[]>(`${environment.apiUrl}/${this.contoller_url}/${page}/${size}/${search}`);
  }

  findById(id:number){
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.contoller_url}/${id}`)
      .pipe(map(promotionFound => {return promotionFound;}));
  }

  getCount(){
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.contoller_url}/count`);
  }

  delete(element: number) {
    return this.httpClient.delete(`${environment.apiUrl}/${this.contoller_url}/${element}`);
  }

  save(promotion:Promotion){
    return this.httpClient.post<any>(`${environment.apiUrl}/${this.contoller_url}`, promotion, this.httpHeaders)
      .pipe(map(savedTitre => {return savedTitre}));
  }

  update(promotion:Promotion){
    return this.httpClient.put<any>(`${environment.apiUrl}/${this.contoller_url}`, promotion, this.httpHeaders)
      .pipe(map(savedTitre => {return savedTitre}));
  }
}
