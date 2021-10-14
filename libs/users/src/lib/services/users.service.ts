/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment'
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as countryLib from 'i18n-iso-countries';
import { UsersFacade } from '@jontyjr/users';


declare const require : any;
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrlUse = environment.apiURL + 'users'
  constructor(private http : HttpClient, private userFacade : UsersFacade) { }

  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.apiUrlUse)
  }

  getUser(userId:string):Observable<User>{
    return this.http.get<User>(`${this.apiUrlUse}/${userId}`)
  }
  
  createUser(user : User): Observable<User>{
    return this.http.post<User>(this.apiUrlUse,user)
  }

  updateUser(user : User): Observable<User>{
    return this.http.put<User>(`${this.apiUrlUse}/${user.id}`,user)
  }
   
  deleteUser(userId : string) : Observable<User>{
    return this.http.delete<User>(`${this.apiUrlUse}/${userId}`)
  }

  getCountries(){
    countryLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
     return  Object.entries(countryLib.getNames("en", {select: "official"})).map(
      (entry) =>{
        return {
          id: entry[0],
          name : entry[1]
        }
      }
    )
  }

  
  getCountry(countryKey: string) {
    return countryLib.getName(countryKey, 'en');
  }

  initAppSession(){
      this.userFacade.buildUserSession()
  }

  observeCurrentUser(){
   return this.userFacade.currentUser$
  }

  isCurrentUserAuth(){
   return   this.userFacade.isAuthenticated$
  }

}
