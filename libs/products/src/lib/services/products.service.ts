/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import {environment} from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrlPro = environment.apiURL + 'products'
  constructor(private http : HttpClient) {

   }

   getProducts(categoriesFilter?: string[]): Observable<Product[]>{

    let params = new HttpParams();
    if(categoriesFilter){
      params = params.append('category',categoriesFilter.join(','))
    
    }
     return this.http.get<Product[]>(this.apiUrlPro,{params: params})
   }

   
   getProduct(productId: string): Observable<Product>{
    return this.http.get<Product>(`${this.apiUrlPro}/${productId}`)
  }



   createProduct(productData : FormData): Observable<Product>{
     return this.http.post<Product>(this.apiUrlPro,productData)
   }

   updateCategory(productData : FormData,productId:string): Observable<Product>{
    return this.http.put<Product>(`${this.apiUrlPro}/${productId}`,productData)
  }

   deleteProduct(productId: string): Observable<Object>{
     return this.http.delete<Object>(`${this.apiUrlPro}/${productId}`)
   }

  //  getProductsCount(): Observable<number>{
  //    return this.http
  //    .get<number>(`${this.apiUrlPro}/get/count`)
  //    .pipe(map((objectValue : any)=> objectValue.productCount))
  //  }


   getFeaturedProducts(count : number): Observable<Product[]>{
     return this.http.get<Product[]>(`${this.apiUrlPro}/get/featured/${count}`)
   }
}