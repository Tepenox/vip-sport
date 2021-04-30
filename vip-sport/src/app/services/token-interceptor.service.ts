import { AuthenticationService } from './authentication.service';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) {
    
   }
  intercept(req, next) {
    let authSerivice = this.injector.get(AuthenticationService);
    let tokenizedReq = req.clone(
      {
        headers:req.headers.set('Authorization','bearer ' + authSerivice.getToken())
      }
    )
    return next.handle(tokenizedReq);
  }
}
