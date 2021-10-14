/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {HttpClient}   from  '@angular/common/http';
import {environment} from '@env/environment';
import {Order} from '../models/orders'
import { Observable } from 'rxjs';
import { OrderItem } from '@jontyjr/orders';
import { switchMap } from 'rxjs/operators';
import { StripeService } from 'ngx-stripe';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiURLOrders = environment.apiURL + 'orders'
  constructor(private http : HttpClient,
   private stripeService : StripeService) { }


  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(this.apiURLOrders)
  }

  
  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiURLOrders}/${orderId}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiURLOrders, order);
  }

  updateOrder(orderStaus: { status: string }, orderId: string): Observable<Order> {
    return this.http.put<Order>(`${this.apiURLOrders}/${orderId}`, orderStaus);
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLOrders}/${orderId}`);
  }

  createCheckoutSession(orderItem : OrderItem [])  {
    return this.http.post(`${this.apiURLOrders}/create-checkout-session`,orderItem)
    .pipe(switchMap((session :any)=>{
     return this.stripeService.redirectToCheckout({sessionId : session.id})
    }))
  }


  cacheOrderData(order: Order){
     localStorage.setItem('orderData', JSON.stringify(order))
  }

  getCachedOrderData( ) : Order {
   return  JSON.parse(localStorage.getItem('orderData'))
  }
}
