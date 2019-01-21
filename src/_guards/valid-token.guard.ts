import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services';

@Injectable({
  providedIn: 'root'
})
export class ValidTokenGuard implements CanActivate {

  constructor(private route: ActivatedRoute, private auth: AuthService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true
  }
}
