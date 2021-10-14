import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart, CartService, Order, OrderItem, OrdersService } from '@jontyjr/orders';
import { User, UsersService } from '@jontyjr/users';
import { StripeService } from 'ngx-stripe';
import { Subject } from 'rxjs';
import {  takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jontyjr-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [
  ]
})
export class CheckoutPageComponent implements OnInit,OnDestroy {
  form: FormGroup
  isSubmited = false;
  
   ordersItem : OrderItem[] = []
   userId : string
  countries : any = []
  unsub$ : Subject<any> = new Subject();
  constructor(private router : Router,
    private formBulider : FormBuilder,
    private usersService : UsersService,
    private cartService : CartService,
    private orderService : OrdersService,
    private stripeService : StripeService) { }

  ngOnInit(): void {

    this._initCheckoutForm();
    this._autoFillUserData()
    this._getCartItem();
    this._getCountries()

  }

  ngOnDestroy(){
    this.unsub$.next();
    this.unsub$.complete();
  }

  private _initCheckoutForm(){
    this.form = this.formBulider.group(
      {
        name : ['',Validators.required],
      
        email: ['',[Validators.required,Validators.email]],
        phone : ['',Validators.required],
     
        street :['',Validators.required],
        apartment : ['',Validators.required],
        zip : ['',Validators.required],
        city : ['',Validators.required],
        country : ['',Validators.required]
      }
    );
  }
  placeOrder(){
    this.isSubmited = true;
    if(this.userCheckoutForm.invalid){
      return
    }

    const  order : Order ={
     
      orderItems: this.ordersItem,
      shippingAddress1: this.userCheckoutForm.street.value,
      shippingAddress2: this.userCheckoutForm.apartment.value,
      city : this.userCheckoutForm.city.value,
      zip : this.userCheckoutForm.zip.value,
      country: this.userCheckoutForm.country.value,
      phone: this.userCheckoutForm.phone.value,
      status: 0,
     
      user :  this.userId,
      dateOrdered: `${Date.now()}`,
    }

    this.orderService.cacheOrderData(order);

    this.orderService.createCheckoutSession(this.ordersItem).subscribe(error => {
      if(error){
        console.log('error in redicret paymet')
      }
   })
  }


  backToCart(){
     this.router.navigate(['/cart'])
  }

  private _getCountries(){
    this.countries = this.usersService.getCountries()
 }

 private _getCartItem(){
  const cart : Cart =  this.cartService.getCart()
  this.ordersItem = cart.items.map((item)=>{
    return {
      product : item.productid,
      quantity : item.qty
    }
  })

 
 }

  get userCheckoutForm(){
    return this.form.controls
  }



  private _autoFillUserData(){
    this.usersService.observeCurrentUser().pipe(takeUntil(this.unsub$)).subscribe((user ) =>{
      if(user){
        this.userId = user.id;
        this.userCheckoutForm.name.setValue(user.name)
        this.userCheckoutForm.email.setValue(user.email);
        this.userCheckoutForm.phone.setValue(user.phone);
        this.userCheckoutForm.city.setValue(user.city);
        this.userCheckoutForm.street.setValue(user.street);
        this.userCheckoutForm.country.setValue(user.country);
        this.userCheckoutForm.zip.setValue(user.zip);
        this.userCheckoutForm.apartment.setValue(user.apartment);
      }
     

    })
  }

}
