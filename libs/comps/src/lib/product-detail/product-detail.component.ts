import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@jontyjr/orders';
import { Product, ProductsService } from '@jontyjr/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'jontyjr-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent implements OnInit , OnDestroy{
 product : Product;
 endSubs$ : Subject<any> = new Subject()
 qty =1
  constructor(private prodService : ProductsService,
      private route : ActivatedRoute,
      private cartService : CartService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params)=>{
      if(params.productid){
        this._getProduct(params.productid)
      }
    })
  }


  ngOnDestroy():void{
    this.endSubs$.next();
    this.endSubs$.complete()
  }


  addToCart(){
    const cartItem : CartItem  = {
      productid :this.product.id,
      qty : this.qty
    } 

    this.cartService.setCartItem(cartItem)
  }


  private _getProduct(id: string){
    this.prodService.getProduct(id).pipe(takeUntil(this.endSubs$)).subscribe((resPro)=>{
      this.product = resPro
    })
  }

}
