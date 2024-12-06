import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserParamsService } from '../../services/user-params.service';

@Injectable({
  providedIn: 'root'
})
export class VirtualGuard implements CanActivate {
  allowedVirtuel: boolean;
  isSignedIn: boolean;
  constructor(private UserParamsServ: UserParamsService, private route: Router, private authServ: AuthService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.isSignedIn = this.authServ.isLoggedIn();
    if (this.isSignedIn) {
      this.UserParamsServ.virtuel.subscribe(res => {
        this.allowedVirtuel = res;
      });

      if (!this.allowedVirtuel) {
        this.route.navigate(['/home']);
      }
    }
    return true;
  }

}
