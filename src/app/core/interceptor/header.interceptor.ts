import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  userToken: any
  constructor(private authServ: AuthService,
    private toastrService: ToastrService,
    private translatServ: TranslateService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.userToken = localStorage.getItem("accessToken");
    if (request.url != 'https://api.ipify.org/?format=text') {
      if (this.userToken != null && this.authServ.isTokenExpired()) {
        this.authServ.logout()
        this.toastrService.warning(this.translate("Session Timed Out! Please Login"));
        return throwError("Session Timed Out")
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.userToken}`
          }
        });
        return next.handle(request)
          .pipe(
            tap(event => {
            }, error => {
            })
          )
      }
    } else {
      return next.handle(request)
        .pipe(
          tap(event => {
          }, error => {
          })
        )
    }
  }

  private translate(txt: string): string {
    return this.translatServ.instant(txt);
  }
}