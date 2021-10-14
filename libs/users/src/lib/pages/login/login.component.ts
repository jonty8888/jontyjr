import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
 loginFormGroup : FormGroup
 isSubmitted = false
 authError = false
 authMsg = 'Email or Password are wrong '
  constructor(private formBulder : FormBuilder,
    private authService : AuthService,
    private localStorageSerivce : LocalstorageService,
    private router : Router) { }

  ngOnInit(): void {
    this._initLoginForm()
  }

  private _initLoginForm(){
    this.loginFormGroup = this.formBulder.group({
      email : ['',[Validators.required,Validators.email]],
      password : ['',Validators.required]
    })
  }

  get loginForm(){
    return this.loginFormGroup.controls
  }

  onSubmit(){
     this.isSubmitted= true;
     if(this.loginFormGroup.invalid){
       return
     }
     const loginData = {
       email : this.loginForm.email.value,
       password : this.loginForm.password.value
     }
     this.authService.login(loginData.email,loginData.password).subscribe(
       (user)=>{
         this.authError = false;
         this.localStorageSerivce.setToken(user.token)
         this.router.navigate(['/'])
       },
       (error : HttpErrorResponse)=>{
         this.authError =true
         if(error.status !== 400){
           this.authMsg = 'Error in the server, Please try again later'
         }
       }
     )
  }

}
