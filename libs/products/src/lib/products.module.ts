/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from '@jontyjr/products';
@NgModule({
    imports: [CommonModule,HttpClientModule],
    declarations: [
      ProductSearchComponent,
      CategoriesBannerComponent
    ],
    exports:[ProductSearchComponent, CategoriesBannerComponent],
    providers: []
})
export class ProductsModule {}
