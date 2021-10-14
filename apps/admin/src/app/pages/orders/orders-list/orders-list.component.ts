import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Order,OrdersService,ORDER_STATUS } from '@jontyjr/orders';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})




export class OrdersListComponent implements OnInit {

 orders : Order[] = []
 orderStatus = ORDER_STATUS
  constructor(
    private messageService : MessageService,
    private ordersService : OrdersService,
    private confirmationService : ConfirmationService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this._getOrders();
  }

  _getOrders(){
    this.ordersService.getOrders().subscribe(
      (orders)=>{
        this.orders = orders
        
      }
    )
  }

  showOrder(orderId : string){
    this.router.navigateByUrl(`orders/${orderId}`)
  }

  deleteOrder(orderId : string){
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).subscribe(
          () => {
            this._getOrders();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Order is deleted!'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Order is not deleted!'
            });
          }
        );
      }
    })
  }

}
