import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule,Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule} from '@jontyjr/products'
import { UiModule} from  '@jontyjr/ui'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CompsModule} from '@jontyjr/comps'
import {OrdersModule} from '@jontyjr/orders';
import {JwtInterceptor, UsersModule} from '@jontyjr/users';
import { MessagesComponent } from './shared/messages/messages.component'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ReducerManager, ReducerManagerDispatcher, StoreFeatureModule, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';
const routes: Routes = [{
  path : '',
  component : HomePageComponent
},]

@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent, MessagesComponent],
  imports: [BrowserModule,BrowserAnimationsModule,HttpClientModule,RouterModule.forRoot(routes),AccordionModule,ProductsModule,UiModule, CompsModule, OrdersModule
  , ToastModule,FormsModule,UsersModule,StoreModule.forRoot({}),EffectsModule.forRoot([]),
NgxStripeModule.forRoot('pk_test_51JjIzOSFWHtTnysTLs19130NGFDNHrdOWXqHOkohSmFiPJlBfmx54GBeHzc0pCtKLG3vdKWFzI6oJ3yBdT2Ljeg5008Lqgm9K2  ')
],
  providers: [MessageService,
    {provide : HTTP_INTERCEPTORS, useClass : JwtInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
