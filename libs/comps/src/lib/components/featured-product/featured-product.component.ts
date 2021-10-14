import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@jontyjr/products';

@Component({
  selector: 'jontyjr-featured-product',
  templateUrl: './featured-product.component.html',
  styles: [
  ]
})
export class FeaturedProductComponent implements OnInit {
  pro : Product[] = []
  constructor(private proService : ProductsService) { }

  ngOnInit(): void {
    this._getFeaturedProducts()
  }

  private _getFeaturedProducts(){
    this.proService.getFeaturedProducts(4).subscribe((pro)=>{
            this.pro =pro
    })
  }

}
