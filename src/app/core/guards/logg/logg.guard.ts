import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggGuard implements CanActivate {
  isSignedIn!: boolean;
  constructor(
    private authServ: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isSignedIn = this.authServ.isLoggedIn();
      if (this.isSignedIn) {
        this.router.navigateByUrl('');
      }
  
      return true;
  }
  
}
