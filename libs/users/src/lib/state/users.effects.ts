import { Injectable } from '@angular/core';
import { UsersService } from '@jontyjr/users';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { of } from 'rxjs';
import {catchError, concatMap, map} from 'rxjs/operators'
import { LocalstorageService } from '../services/localstorage.service';
import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';

@Injectable()
export class UsersEffects {
   bulidUsersession$ = createEffect(()=> this.actions$.pipe(
       ofType(UsersActions.buildUserSession),
       concatMap(()=>{
              if(this.localstorageService.isValidToken()){
                  const userId = this.localstorageService.getUserIdFromToken();
                 if(userId){
                     return this.userService.getUser(userId).pipe(
                         map((user)=>{
                             return UsersActions.buildUserSessionSuccess({user : user})
                         }),
                         catchError(()=> of(UsersActions.buildUserSessionFailed()))
                     )
                 }else {
                    return of(UsersActions.buildUserSessionFailed()) 
                 }

              } else {
                  return of(UsersActions.buildUserSessionFailed())
              }
       })
   ))

    constructor(private  actions$: Actions, private localstorageService : LocalstorageService,
        private userService : UsersService
        ) {}
}
