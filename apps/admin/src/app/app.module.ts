import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import {  JwtInterceptor, UsersModule } from '@jontyjr/users';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { CategoriesService, ProductsService } from '@jontyjr/products';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { TagModule } from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import {FieldsetModule} from 'primeng/fieldset';



import { RoutingModule } from './routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';

const Ux_module = [
  CardModule,ToolbarModule,ButtonModule,TableModule,InputTextModule,ToastModule,ConfirmDialogModule,ColorPickerModule,
  InputNumberModule,InputTextareaModule,InputSwitchModule,DropdownModule,EditorModule,TagModule,InputMaskModule,FieldsetModule
]


@NgModule({
  declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent, UserListComponent, UserFormComponent, OrdersListComponent, OrdersDetailComponent,],
  imports: [
    BrowserModule,RoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule,BrowserAnimationsModule,
    StoreModule.forRoot({}),EffectsModule.forRoot([]),
    NgxStripeModule.forRoot('pk_test_51JjIzOSFWHtTnysTLs19130NGFDNHrdOWXqHOkohSmFiPJlBfmx54GBeHzc0pCtKLG3vdKWFzI6oJ3yBdT2Ljeg5008Lqgm9K2  '),


    ...Ux_module,UsersModule,
  ],
  providers: [CategoriesService,MessageService,ConfirmationService,
  {provide : HTTP_INTERCEPTORS, useClass : JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
