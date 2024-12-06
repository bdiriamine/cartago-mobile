import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';
import { UserParamsService } from '../../services/user-params.service';

@Injectable({
  providedIn: 'root'
})
export class MiniGamesGuard implements CanActivate {
  isSignedIn: any;
  allowedGame: any;
  constructor(
    private UserParamsServ: UserParamsService,
    private route: Router,
    private authServ: AuthService,
    private sockerServ: SocketService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.isSignedIn = this.authServ.isLoggedIn();


    this.UserParamsServ.miniGames.subscribe(res => {
      this.allowedGame = res
    });

    if (!this.allowedGame && this.isSignedIn) {
      this.route.navigate(['/home']);
    }
    return true;
  }

}
