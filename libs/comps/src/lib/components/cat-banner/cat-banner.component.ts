import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@jontyjr/products';


@Component({
  selector: 'jontyjr-cat-banner',
  templateUrl: './cat-banner.component.html',
  styles: [
  ]
})
export class CatBannerComponent implements OnInit {
  categories : Category[]=[]
  constructor(private catServices : CategoriesService) { }

  ngOnInit(): void {
    this.catServices.getCategories().subscribe((cats)=>{
      this.categories = cats
    })
  }

}
