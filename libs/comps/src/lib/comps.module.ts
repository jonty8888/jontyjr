import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from '@jontyjr/users';
import { CatBannerComponent } from './components/cat-banner/cat-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductComponent } from './components/featured-product/featured-product.component'
import {ButtonModule} from 'primeng/button';
import { ProductsListComponent } from './components/products-list/products-list.component';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import { UiGalleyComponent } from './ui-galley/ui-galley.component';
import { ShopIconComponent } from './components/shop-icon/shop-icon.component';
import {BadgeModule} from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent} from './pages/checkout-page/checkout-page.component'
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { InputTextModule } from 'primeng/inputtext';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import { ThankyouComponent } from './pages/thankyou/thankyou.component';
import { LoginComponent } from './pages/login/login.component';
 const routes : Routes =[
   {
     path : 'products',
     component: ProductsListComponent
   },
   {
    path : 'category/:categoryid',
    component: ProductsListComponent
  },
  {
    path : 'products/:productid',
    component: ProductDetailComponent
  },

  {
    path: 'cart',
    component : CartPageComponent
  },
  {
    canActivate : [AuthGuardService],
     path : 'checkout',
     component:  CheckoutPageComponent
  },
  {
    path : 'success',
    component : ThankyouComponent
  },
  {
    path : 'login',
    component: LoginComponent
  }



 ]
@NgModule({
    imports: [CommonModule,RouterModule.forChild(routes),ButtonModule,
       CheckboxModule,FormsModule,RatingModule,
       InputNumberModule,BadgeModule,ButtonModule,
      InputTextModule,InputMaskModule,DropdownModule,
      ReactiveFormsModule
    ],
    declarations: [
      CatBannerComponent,
      ProductsListComponent,
      FeaturedProductComponent,
      ProductItemComponent,
      ProductDetailComponent,
      UiGalleyComponent,
      ShopIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      ThankyouComponent,
      LoginComponent
    ],
    exports: [
      CatBannerComponent,
      ProductItemComponent,
      FeaturedProductComponent,
      ProductsListComponent,
      ProductDetailComponent,
      UiGalleyComponent,
      ShopIconComponent,
      CartPageComponent,
      OrderSummaryComponent,
      CheckoutPageComponent,
      ThankyouComponent,
      LoginComponent
    ]
})
export class CompsModule {}
