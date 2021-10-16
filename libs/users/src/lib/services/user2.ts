import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { UsersFacade } from '@jontyjr/users';




@Injectable({
  providedIn: 'root'
})
export class User2Service {
  constructor(private userFacade : UsersFacade) { }

 

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
