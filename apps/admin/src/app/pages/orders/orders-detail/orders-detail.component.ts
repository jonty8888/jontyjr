/* eslint-disable @typescript-eslint/no-explicit-any */
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrdersService ,ORDER_STATUS } from '@jontyjr/orders';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {

   order:Order
   orderStatuses : any = []  
   selectedStatus: any 
  
 
  constructor( private ordersService : OrdersService,
               private route : ActivatedRoute  ,
             private  messageService  : MessageService  ,
             private location : Location  ,
           
    ) { }
 
  
  ngOnInit(): void {
    this._mapOrderStatus()
    this._getOrder()
  }

  

  private _getOrder(){
    this.route.params.subscribe((params)=>{
      if(params.id){
        this.ordersService.getOrder(params.id).subscribe((order)=>{
          this.order = order
          this.selectedStatus = order.status
      
        })
      }
    })
   

  }

  private _mapOrderStatus(){
   this.orderStatuses = Object.keys(ORDER_STATUS).map((key)=>{
      return {
        id: key,
        name : ORDER_STATUS[key].label
      }
    })
  }

  onStatusChange(event : any) {
    this.ordersService.updateOrder({ status: event.value }, this.order.id).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order is updated!'
        });
        timer(400).toPromise().then(
          (done) =>{
            this.location.back()
          }
        )
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Order is not updated!'
        });
      }  
    );
  }

}
