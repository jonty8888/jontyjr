import { Component, Input, OnInit } from '@angular/core';
import { Product } from '@jontyjr/products';
import {Cart, CartItem, CartService} from '@jontyjr/orders'

@Component({
  selector: 'jontyjr-product-item',
  templateUrl: './product-item.component.html',
  styles: [
  ]
})
export class ProductItemComponent implements OnInit {
   @Input() product : Product 
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
  }

  addProductToCart(){
    const cartItem : CartItem ={
      productid : this.product.id,
      qty : 1
    }
    this.cartService.setCartItem(cartItem)

  }

}
