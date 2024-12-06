import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserParamsService } from '../../services/user-params.service';

@Injectable({
  providedIn: 'root'
})
export class GameshowGuard implements CanActivate {
  allowedGameShow :boolean;
  isSignedIn :boolean;
  constructor(private UserParamsServ: UserParamsService, private route: Router, private authServ: AuthService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isSignedIn = this.authServ.isLoggedIn();
    this.UserParamsServ.gameShow.subscribe(res => {
      this.allowedGameShow = res
    });

    if (!this.allowedGameShow && this.isSignedIn) {
      this.route.navigate(['/home']);
    }

    return true;
  }

}
