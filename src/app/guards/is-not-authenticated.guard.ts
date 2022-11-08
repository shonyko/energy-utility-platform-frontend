import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthenticatedGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('daaaa')
    const isLoggedIn = this.authService.isLoggedIn;
    if (isLoggedIn) {
      const role = this.authService.getRoles()[0];
      this.router.navigate([role.toLowerCase()]);
      console.log('poate')
      return false;
    }

    return !isLoggedIn;
  }

}
