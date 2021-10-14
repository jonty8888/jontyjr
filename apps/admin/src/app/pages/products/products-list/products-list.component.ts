import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Product, ProductsService } from '@jontyjr/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {
    products:Product[] = []
  constructor(private productsService : ProductsService,
     private router : Router,
     private conformationService : ConfirmationService,
     private messageService : MessageService) { }

  ngOnInit(): void {
    this._getProducts();
  }

   updateProduct(productId: string){
       this.router.navigateByUrl(`products/form/${productId}`)
  }
 

   deleteProduct(proId: string){
    this.conformationService.confirm({
      message : 'Do you want to delete this Product?',
      header : 'Delete User',
      icon : 'pi pi-exclamation-triangle',
      accept : () =>{
        this.productsService.deleteProduct(proId).subscribe(
         ()=>{
           this._getProducts();
           this.messageService.add({
             severity:'success',
             summary:'Success',
             detail:'Product is  deleted'
           })
         },
         ()=>{
           this.messageService.add({
            severity:'Error',
            summary:'Error',
            detail:'Product is not deleted'
           })
         }
        )
      }
    })
  }


  private _getProducts(){
    this.productsService.getProducts().subscribe((products)=>{
      this. products = products;
    })
    }

}
