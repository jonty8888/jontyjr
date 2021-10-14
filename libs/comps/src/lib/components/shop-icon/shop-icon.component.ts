import { Component, OnInit } from '@angular/core';
import { CartService } from '@jontyjr/orders';

@Component({
  selector: 'jontyjr-shop-icon',
  templateUrl: './shop-icon.component.html',
  styles: [
  ]
})
export class ShopIconComponent implements OnInit {
   cartCount  :any
  constructor(private cartSevice : CartService) { }

  ngOnInit(): void {
    this.cartSevice.cart$.subscribe((cart) =>{
      this.cartCount = cart?.items?.length  ?? 0
     
    })

  }

}
