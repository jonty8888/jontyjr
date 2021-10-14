import { Component, OnInit } from '@angular/core';
import { CartService, OrdersService } from '@jontyjr/orders';

@Component({
  selector: 'jontyjr-thankyou',
  templateUrl: './thankyou.component.html',
  styles: [
  ]
})
export class ThankyouComponent implements OnInit {

  constructor(private orderService : OrdersService,
  private  cartService : CartService) { }

  ngOnInit(): void {
     const orderData = this.orderService.getCachedOrderData();

     this.orderService.createOrder(orderData).subscribe(()=>{
           this.cartService.emptyCart();      
     })

  }

}
