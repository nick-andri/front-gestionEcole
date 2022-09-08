import { environment } from './../../environments/environment';
import { User } from './../_models/user';
import { LoginResponse } from '../_models/loginResponse';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
}) //@Service , ce service va pouvoir être injecté dans les différents composants


export class UserService{

  contoller_url = '/Users'

  private httpHeaders = {
    headers : new HttpHeaders({
         'Access-Control-Allow-Origin':'*'
    })
  }
  constructor(private httpClient:HttpClient){

  }

  getAllByPage(page: number,size:number){
    return this.httpClient.get<User[]>(`${environment.apiUrl}/${this.contoller_url}/${page}/${size}`);
  }

  getAll(page:number, size:number, search:string){
    console.log(environment.apiUrl);
    return this.httpClient.get<User[]>(`${environment.apiUrl}/${this.contoller_url}/name/${page}/${size}/${search}`);
  }

  findById(id:number){
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.contoller_url}/${id}`)
               .pipe(map(userFound => {return userFound;}));
  }

  countUsers(){
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.contoller_url}/count`);
  }

  countUsersBySearch(search:string){
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.contoller_url}/count/${search}`);
  }

  delete(id:number){
    return this.httpClient.delete<void>(`${environment.apiUrl}/${this.contoller_url}/${id}`);
  }

  save(user:User){
    return this.httpClient.post<any>(`${environment.apiUrl}/${this.contoller_url}`, user, this.httpHeaders)
              .pipe(map(savedUser => {return savedUser}));
  }

  update(user:User){
    return this.httpClient.put<any>(`${environment.apiUrl}/${this.contoller_url}`, user, this.httpHeaders)
              .pipe(map(savedUser => {return savedUser}));
  }


  hashPassword(pass:String) {
    return this.httpClient.post<string>(`${environment.apiUrl}/${this.contoller_url}/checkPass`,pass,this.httpHeaders);

  }
}
