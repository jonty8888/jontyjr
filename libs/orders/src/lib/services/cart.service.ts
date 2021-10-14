import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

import { Cart, CartItem } from '../models/cart';
export const CART_KEY  = "cart"
@Injectable({
  providedIn: 'root'
})
export class CartService {
   cart$ :  BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  constructor() { }

  initCartLocalStorage(){

    const cart : Cart = this.getCart();
    if(!cart){
      const initialCart : any = {
        items  : []
  
    
  
      }
      const initialCartJson = JSON.stringify(initialCart)
    
        localStorage.setItem(CART_KEY, initialCartJson)
    }
  
  }


  getCart(): Cart {
    const cartJsonString : string  = localStorage.getItem(CART_KEY)
    const cart : Cart = JSON.parse(cartJsonString);
    return cart 
  }

  emptyCart(){
    const initialCart = {
      items : []
    };
    const initialCartJson = JSON.stringify(initialCart)
    localStorage.setItem(CART_KEY,initialCartJson)
    this.cart$.next(initialCart)
  }



  setCartItem(cartItem : CartItem,updateCart?: boolean) : Cart{
        const cart = this.getCart();
        const cartItemsExist = cart.items.find((item)=>item.productid === cartItem.productid)
        if(cartItemsExist){
                    cart.items.map((item)=>{
                      if(item.productid === cartItem.productid){

                        if(updateCart){
                          item.qty = cartItem.qty
                        }else{
                        item.qty = item.qty + cartItem.qty
                        }
                        return item;
                      }
                    })
        }else {
          cart.items.push(cartItem);
        }
       
        const cartJson = JSON.stringify(cart);
        localStorage.setItem(CART_KEY,cartJson)
        this.cart$.next(cart)
        return cart;

  }

  deleteCartItem(productid : string){
    const cart = this.getCart();
    const newCart = cart.items.filter(item => item.productid !== productid)
    cart.items = newCart;
        const cartJsonString = JSON.stringify(cart);
        localStorage.setItem(CART_KEY,cartJsonString)
            this.cart$.next(cart)
  }


}
