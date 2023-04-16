import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  setSessionStorageItem(data:any){
    sessionStorage.setItem('data', JSON.stringify(data));
  }

  getSessionStorageItem(){
    return sessionStorage.getItem('data');
  }

  isUserLoggedIn(){
    if(sessionStorage.getItem('data') !== null){
      return true;
    }
    return false;
  }

  removeSessionStorageItem(){
    sessionStorage.removeItem('data');
  }

}
