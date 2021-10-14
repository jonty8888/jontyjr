import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService,  } from '@jontyjr/orders';
import { ProductsService } from '@jontyjr/products';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jontyjr-order-summary',
  templateUrl: './order-summary.component.html',
  styles: [
  ]
})
export class OrderSummaryComponent implements OnInit ,OnDestroy {
   endSubs$ : Subject<any> = new Subject()
   totalPrice : number
   isCheckout = false
   isSubmitted = false
  constructor(private cartService : CartService,
    private productService : ProductsService,
    private router : Router) { 
      this.router.url.includes('checkout') ? this.isCheckout =true : this.isCheckout = false
    }

  ngOnInit(): void {
    this._getOrderSummary();
  }

  ngOnDestroy(){
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  _getOrderSummary(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart)=>{
      this.totalPrice = 0;
      if(cart){
        cart.items.map((item)=>{
          this.productService.getProduct(item.productid)
          .pipe(take(1))
          .subscribe((product)=>{
            this.totalPrice += product.price * item.qty
          })
        })
      }
    })
  }



  navigateToCheckout (){
  this.router.navigate(['/checkout'])
  }

}
