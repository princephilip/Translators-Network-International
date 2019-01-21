import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

// adding authservice here is a little trickish
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req, next){
    let authservice = this.injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${authservice.getToken}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
