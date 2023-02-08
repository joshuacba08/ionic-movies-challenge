import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest, User } from '../../interfaces/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient){}


  login(data: LoginRequest){
    return this.httpClient.post<User>(`${environment.endpointServer}/auth/login`, data);
  }

  register(data: RegisterRequest){
    return this.httpClient.post(`${environment.endpointServer}/auth/register`, data);
  }



}
