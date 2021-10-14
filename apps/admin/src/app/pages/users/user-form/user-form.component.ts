/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UsersService } from '@jontyjr/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import * as countryLib from  "i18n-iso-countries"


declare const require : any;
@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
  styles: [
  ]
})
export class UserFormComponent implements OnInit {
   form: FormGroup
   isSubmited : boolean = false;
   editMode = false;
   currentUserId : string;
   users : User[] = []
   countries : any = []
  constructor(
      private formBulider : FormBuilder,
      private usersService : UsersService,
      private messageService : MessageService,
      private location : Location,
      private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._initUserForm();
    this._getCountries()
    this._getUsers();
    this._checkEditMode();
  }
 private _getCountries(){
    this.countries = this.usersService.getCountries()
 }

  private _initUserForm(){
    this.form = this.formBulider.group(
      {
        name : ['',Validators.required],
        password :['',[Validators.required]],
        email: ['',[Validators.required,Validators.email]],
        phone : ['',Validators.required],
        isAdmin : [false],
        street :[''],
        apartment : [''],
        zip : [''],
        city : [''],
        country : ['']
      }
    );
  }
  
   private _getUsers(){
     this.usersService.getUsers().subscribe((users)=>{
       this.users = users
     })
   }

   private _addUser(user : User){
     this.usersService.createUser(user).subscribe((user : User)=>{
      this.messageService.add({
        severity:'success',
        summary: 'Success',
        detail : `${user.name} is created`
      });
      timer(400).toPromise().then(
        (done) =>{
          this.location.back()
        }
      )
     },
     (error) =>{
      this.messageService.add({
        severity:'error',
        summary: 'Error',
        detail : 'Product is not created'
      })
    }
     )
   }

   private _updateUser(user : User){
    this.usersService.updateUser(user).subscribe((response) =>{
      this.messageService.add({
        severity:'success',
        summary: 'Success',
        detail : 'User is updated'
      });
      timer(400).toPromise().then(
        (done) =>{
          this.location.back()
        }
      )
   },
   (error) =>{
     this.messageService.add({
       severity:'error',
       summary: 'Error',
       detail : 'User is not updated'
     })
   }
   )
  }

  goback(){
     
    
    this.location.back()
}


onSubmit() {
  this.isSubmited = true;
  if (this.form.invalid) {
    return;
  }
  const user: User = {
    id: this.currentUserId,
    name: this.userForm.name.value,
    email: this.userForm.email.value,
    phone: this.userForm.phone.value,
    password : this.userForm.password.value,
    isAdmin: this.userForm.isAdmin.value,
    street: this.userForm.street.value,
    apartment: this.userForm.apartment.value,
    zip: this.userForm.zip.value,
    city: this.userForm.city.value,
    country: this.userForm.country.value
  };
  if (this.editMode) {
    this._updateUser(user);
  } else {
    this._addUser(user);
  }
}

private _checkEditMode(){
  this.route.params.subscribe(
    (params) => {
      if(params.id){
        this.editMode = true;
        this.currentUserId = params.id;
        this.usersService.getUser(params.id).subscribe(
          (user) =>{
           this.userForm.name.setValue(user.name)
           this.userForm.email.setValue(user.email)
           this.userForm.isAdmin.setValue(user.isAdmin)
           this.userForm.street.setValue(user.street)
           this.userForm.apartment.setValue(user.apartment)
           this.userForm.zip.setValue(user.zip)
           this.userForm.phone.setValue(user.phone)
           this.userForm.city.setValue(user.city)
           this.userForm.country.setValue(user.country)
           this.userForm.password.setValidators([])

            this.userForm.password.updateValueAndValidity();
          }
        )
      }
    }
  )
}



  get userForm(){
    return this.form.controls
  }

}
