import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UsersService,User} from '@jontyjr/users';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styles: [
  ]
})
export class UserListComponent implements OnInit {
   users : User[] =[]
  constructor(
    private usersService : UsersService,
    private messageService : MessageService,
    private conformationService : ConfirmationService,
    private router : Router
  ) { }

  ngOnInit(): void {
   this._getUsers()
  }



  deleteUser(userId: string){
    this.conformationService.confirm({
      message : 'Do you want to delete this User?',
      header : 'Delete User',
      icon : 'pi pi-exclamation-triangle',
      accept : () =>{
        this.usersService.deleteUser(userId).subscribe(
         ()=>{
           this._getUsers();
           this.messageService.add({
             severity:'success',
             summary:'Success',
             detail:'User is  deleted'
           })
         },
         ()=>{
           this.messageService.add({
            severity:'Error',
            summary:'Error',
            detail:'User is not deleted'
           })
         }
        )
      }
    })
  }

  updateUser(userId: string){
  
      this.router.navigateByUrl(`users/form/${userId}`);
    
  }



  private _getUsers(){
    this.usersService.getUsers().subscribe((users)=>{
      this.users = users
    })
  }
  getCountryName(countryKey: string) {
    if (countryKey) return this.usersService.getCountry(countryKey);
  }



  
 


}
