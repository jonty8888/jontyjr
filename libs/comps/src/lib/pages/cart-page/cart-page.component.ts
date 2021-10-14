import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetailed, CartService } from '@jontyjr/orders';
import { ProductsService } from '@jontyjr/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'jontyjr-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [
  ]
})
export class CartPageComponent implements OnInit , OnDestroy{
  cartItemsDetailed : CartItemDetailed[] = []
  cartCount = 0
  endSubs$ : Subject<any> = new Subject()
  constructor(private router : Router,
    private cartService : CartService,
    private  ProductService : ProductsService) { }

  ngOnInit(): void {
    this._getCartDetails()
  }

  ngOnDestroy(){  
    this.endSubs$.next()
    this.endSubs$.complete()
  }

  goBack(){
    this.router.navigate(['/products'])
  }

  deleteCartItem(cartItem : any){
    this.cartService.deleteCartItem(cartItem.product.id)

  }

  private  _getCartDetails(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((resCart)=>{
      this.cartItemsDetailed = []
      this.cartCount = resCart.items?.length ?? 0
      resCart.items.forEach(cartItem =>{
        this.ProductService.getProduct(cartItem.productid).subscribe((resPro)=>{
           this.cartItemsDetailed.push({
             product : resPro,
             qty : cartItem.qty

           })
        })
      })
    })
  }

  cartChange(event, cartIem: CartItemDetailed){
    this.cartService.setCartItem({
      productid : cartIem.product.id,
      qty : event.value
    },true)
  }    

}
