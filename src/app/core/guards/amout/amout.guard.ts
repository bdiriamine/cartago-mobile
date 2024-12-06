import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SocketService } from '../../services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class AmoutGuard implements CanActivate {
  isBlocked: boolean;
  constructor(
    private socketServ: SocketService,
    private router: Router
  ) {
    this.socketServ.blocked.subscribe((data: any) => {
      this.isBlocked = data;
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.isBlocked) {
      this.router.navigateByUrl('');
    }
    return true;
  }

}
