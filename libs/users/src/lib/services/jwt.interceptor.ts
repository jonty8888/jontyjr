import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { environment } from '@env/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private  localSorageService : LocalstorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     const token = this.localSorageService.getToken();

     const isApiUrl = request.url.startsWith(environment.apiURL);

     if(token && isApiUrl) {
       request = request.clone({
         setHeaders : {
           Authorizaton : `Bearer ${token}`
         }
       })
     }

    return next.handle(request);
  }
}
