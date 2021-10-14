/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from '@env/environment'
import { User } from '@jontyjr/users';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
   apiUrlAuth =environment.apiURL + 'users'
  constructor(private http : HttpClient,
       private localToken : LocalstorageService,
       private router : Router) { }
  login(email : string, password : string) : Observable<User>{
return this.http.post<User>(`${this.apiUrlAuth}/login`,{email,password})
  }

  logOut(){
      this.localToken.removeToken()
      this.router.navigate(['/login'])
  }
}
