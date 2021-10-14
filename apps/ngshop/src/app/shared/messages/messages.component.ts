import { Component, OnInit } from '@angular/core';
import { CartService } from '@jontyjr/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'ngshop-messages',
  templateUrl: './messages.component.html',
  styles: [
  ]
})
export class MessagesComponent implements OnInit {

  constructor(private msgService : MessageService,
   private cartService : CartService) { }

  ngOnInit(): void {

    this.cartService.cart$.subscribe(() => {
      this.msgService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Cart Updated!'
      });
    });
    
  }

}
