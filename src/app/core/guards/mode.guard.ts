import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';

@Injectable({
  providedIn: 'root'
})
export class ModeGuard implements CanActivate {
  InMaintenance;
  constructor(
    private router: Router,
    private sockerServ: SocketService,
    private authServ: AuthService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    this.authServ.InMaintenance.subscribe(maint => {
      if (maint) {
        this.router.navigate(["maintenance"])
      }
    })

    return true;
  }
}
