import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category, Product, ProductsService } from '@jontyjr/products';

@Component({
  selector: 'jontyjr-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

 
 
    products : Product[] = []
    categories : Category[] = []
    isCategoryPage = false
  constructor(private ProdServices : ProductsService,
    private CatService : CategoriesService,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((param)=>{
      param.categoryid ? this._getProducts([param.categoryid]) : this._getProducts();
      param.categoryid ? this.isCategoryPage = true : this.isCategoryPage  = false
    })
  
    this._getCategories();
   
  }


  private _getProducts(categoriesFilter?: string[]){
    this.ProdServices.getProducts(categoriesFilter).subscribe((pro)=>{
           console.log(pro)
              this.products = pro
            
    })
  }

  private _getCategories(){
   this.CatService.getCategories().subscribe((cats)=>{
     this.categories = cats
   })
  }


  categoryFilter(){
        const selectedCats = this.categories.filter(category => category.checked).map(category => category._id)


        this._getProducts(selectedCats)
   
  }

}
