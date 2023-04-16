import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:8080/user";

  constructor(private http: HttpClient) { }

  saveUser(user : User){
    return this.http.post(this.baseUrl+"/add",user);
  }

  authenticateUser(username: string, password: string){
    const credentials = {
      "username" : username,
      "password" : password
    }
    return this.http.post(this.baseUrl+"/authenticate",credentials);
  }

  updateUser(user:User){
    return this.http.put(this.baseUrl+"/update",user);
  }

}
