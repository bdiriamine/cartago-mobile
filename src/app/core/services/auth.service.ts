import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TermsModalComponent } from 'src/app/shared/terms-modal/terms-modal.component';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { TranslateService } from '@ngx-translate/core';
import { JackpotWinnerComponent } from 'src/app/shared/jackpot-winner/jackpot-winner.component';
import { UserParamsService } from './user-params.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  authToken!: any;
  token;
  connectedUser = new Subject<object>();

  signedIn = new BehaviorSubject<boolean>(false);
  castSignedIn = new Subject();

  castToken = new Subject();
  castId = new Subject();
  maint;
  InMaintenance = new Subject();
  sportMaintain = new Subject();
  miniGamesMaintain = new Subject();
  casinoMaintain = new Subject();
  root = new Subject();
  config_webs = new Subject();

  fp = new Subject();
  ipAddress: string;

  constructor(
    private http: HttpClient,
    private toastrService: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private translateServ: TranslateService) { }

  login(username: any, password: any) {

    // this.http.get("https://api.ipify.org/?format=text", { responseType: 'text' }).subscribe((data: any) => {
    //   this.ipAddress = data;
      this.http.post(environment.apiUrl + 'auth/signin', { username: username, password: password, ip_adress: "197.27.118.167" }).subscribe((res: any) => {
        if (res) {
          if (res.jackpotWinner) {
            const modalRef = this.modalService.open(JackpotWinnerComponent, { size: 'xxl' });
            modalRef.componentInstance.username = res.username;
            modalRef.componentInstance.jackpot = res.jackpotData.amount;
          }
          localStorage.setItem('config_web', res.config_webs)
          this.config_webs.next(res.config_webs)

          if (res.showTerms) {
            this.signedIn.next(true);
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('idUser', res.id);
            this.castToken.next(res.accessToken);
            this.castId.next(res.id);
            this.getUser(res.id).subscribe((res: any) => {
              this.connectedUser.next(res.data);
              localStorage.setItem("name", res.data.username)
            })
            this.router.navigate(['/casino']);
            this.toastrService.info(this.translate('You re logged in, please accept terms & conditions to continue or your account will be deactivated'), 'Information');
          } else {
            this.signedIn.next(true);
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('idUser', res.id);
            this.castToken.next(res.accessToken);
            this.castId.next(res.id);

            this.getUser(res.id).subscribe((res: any) => {
              this.connectedUser.next(res.data);
              localStorage.setItem("name", res.data.username)
            })

            this.toastrService.success(this.translate('You are logged in'), 'Success');
            this.router.navigate(['/home'])
          }
        }
      },
        (error: any) => {
          this.toastrService.error(error.error.message, 'error');
        });
    // })



  }

  // maintenance() {
  //   return this.http.get(environment.apiUrl + "maintenance_mode")
  // }

  sportToken() {
    return this.http.post("https://sportbet.carthagobet.tn/api/createPlayer", {})
  }

  private translate(txt: string): string {
    return this.translateServ.instant(txt);
  }

  signup(object) {
    return this.http.post(environment.apiUrl + 'auth/signup', object);
  }

  getUser(id) {
    return this.http.get(environment.apiUrl + 'user/' + id);
  }

  isSignedIn() {
    this.token = localStorage.getItem('accessToken')
if(this.token){
    this.getUser(localStorage.getItem('userId')).subscribe((res: any) => {
      this.connectedUser.next(res.data);
    })}

    return this.token ? true : false;
  }

  isLoggedIn() {
    if (localStorage.getItem('accessToken') != null) {
      this.signedIn.next(true);
      return this.loggedIn = true;

    } else {
      this.signedIn.next(false)
      return this.loggedIn = false;

    }
  }

  getToken() {
    this.authToken = localStorage.getItem('accessToken');
    return this.authToken;
  }

  upload(images: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}users/verif_id`, { images }, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  logout() {
    this.signedIn.next(false);
    this.authToken = null;
    localStorage.removeItem('accessToken');
    localStorage.clear();
    this.modalService.dismissAll();
  }

  getTokenExpirationDate(token: string): Date {
    token = this.getToken()
    var decoded: any = jwt_decode(token);
    if (decoded.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
  sportDIGI(iframesize:number) {
    let username = localStorage.getItem("name")
    return this.http.post(environment.apiUrl + '/auth/refresh', { username: username, ip: this.ipAddress, IsMobile : iframesize })
  }
  getip() {
    this.http.get("https://api.ipify.org/?format=text", { responseType: 'text' }).toPromise().then((data: any) => {
      this.ipAddress = data
    })
  }
}
