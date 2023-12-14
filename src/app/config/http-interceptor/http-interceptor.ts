// src/app/auth/token.interceptor.tsimport { Injectable } from '@angular/core';  
import {  
  HttpRequest,  
  HttpHandler,  
  HttpEvent,  
  HttpInterceptor  
} from '@angular/common/http';  
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminLoginService } from 'src/app/main-page/admin-login/config/service-config/admin-login.service';

@Injectable()
export class interceptor implements HttpInterceptor {

  private token!: string

  constructor(private service: AdminLoginService){}

  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.service.isLoggedIn.subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        request = request.clone({
          setHeaders: { 'x-auth-token': 'jvjekvnnkenvkjnjvnjnvjenjvwrn' }
        });
      } else {
        request = request.clone({
          setHeaders: { 'x-auth-token': this.service.getToken() }
        });
      }
    });
    return next.handle(request);
  }
  
  
}  