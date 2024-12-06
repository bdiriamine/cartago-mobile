import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import io from 'node_modules/socket.io-client/dist/socket.io';
import { ToastrService } from 'ngx-toastr';
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { TransactionsService } from 'src/app/services/transactions/transactions.service';
import { filter } from 'rxjs/internal/operators/filter';
import { UserParamsService } from 'src/app/core/services/user-params.service';
import { SocketService } from 'src/app/core/services/socket.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit, DoCheck {
  link;
  socket: io.Socket;
  token;
  public isCollapsed = false;
  public profiledetails = false;
  public settings = false;
  selectedItem = 'home';
  isLoggedIn = false;
  balance;
  cashback: number = 0;
  hasConverted: boolean;
  username;
  idUser;
  visitorId;
  SOC_URL = environment.socketUrl;
  userConnected = false;
  approuved: boolean;
  block: boolean = false;
  selectedLng;
  game = false;
  gameShow = false;
  virtuel = false;
  jackpot = false;
  miniGames = false;
  sport = false;

  constructor(
    private authServ: AuthService,
    private route: Router,
    private toastrSer: ToastrService,
    private translateServ: TranslateService,
    private transactionsServ: TransactionsService,
    private socketServ: SocketService,
    private userParamsServ: UserParamsService
  ) {

  }

  ngOnInit(): void {
    this.userParamsServ.updateParams();
    this.userParamsServ.game.subscribe(res => {this.game = res ;
    });
    this.userParamsServ.gameShow.subscribe(res => this.gameShow = res);
    this.userParamsServ.virtuel.subscribe(res => this.virtuel = res);
    this.userParamsServ.jackpot.subscribe(res => this.jackpot = res);
    this.userParamsServ.miniGames.subscribe(res => this.miniGames = res);
    this.userParamsServ.sport.subscribe(res => this.sport = res);


    this.selectedLng = this.translateServ.currentLang;
    this.authServ.isLoggedIn();
    if (localStorage.getItem('idUser') != null) {
      this.userConnected = true;
    }
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
        this.link = event.url;
      });

    this.authServ.signedIn.subscribe((res: any) => {
      if (res == true) {
        this.isLoggedIn = true;
        this.getUserName();
      } else {
        this.isLoggedIn = false;
      }
    })

    // // First login
    if (this.idUser == null) {
      this.authServ.castId.subscribe((res: any) => {
        this.idUser = res;
        const fpPromise = FingerprintJS.load()
        fpPromise
          .then(fp => fp.get())
          .then(result => {
            // This is the visitor identifier:
            this.visitorId = result.visitorId;
            this.socketServ.getBalance(this.visitorId, this.idUser)
            this.socketServ.myOBSolde.subscribe((data) => {
              this.balance = data.balance;
              this.cashback = data.cashback;
              this.block = data.blocked;


              this.hasConverted = data.has_converted
              this.socketServ.updateBlock(this.block)
              if (data.balance == 'NaN') {
                this.balance = '0';
              }
              if (data.cashback == null) {
                this.cashback = 0;
              }
              if (data.balance == -1) {
                this.logout();
                this.toastrSer.warning(this.translate('You are already logged in on another device'), 'Warning');
                this.route.navigate(['/']);
                localStorage.clear()
              }
            }, (error) => {
            }, () => {
            })

          })
      })
    }

    // already logged in
    this.idUser = localStorage.getItem('idUser');
    if (this.isLoggedIn == true) {
      const fpPromise = FingerprintJS.load()
      fpPromise
        .then(fp => fp.get())
        .then(result => {
          // This is the visitor identifier:
          this.visitorId = result.visitorId;
          this.socketServ.getBalance(this.visitorId, this.idUser)
          this.socketServ.myOBSolde.subscribe((data) => {
            this.balance = data.balance;
            this.cashback = data.cashback;
            this.block = data.blocked
            this.hasConverted = data.has_converted
            this.socketServ.updateBlock(this.block)
            if (data.balance == 'NaN') {
              this.balance = '0';
            }
            if (data.cashback == null) {
              this.cashback = 0;
            }
            if (data.balance == -1) {
              this.logout();
              this.toastrSer.warning(this.translate('You are already logged in on another device'), 'Warning');
              this.route.navigate(['/']);
              localStorage.clear()
            }
          }, (error) => {
          }, () => {
          })
        })
    }
  }

  ngDoCheck(){
    if(this.isCollapsed) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'scroll'
  }

  private translate(txt: string): string {
    return this.translateServ.instant(txt);
  }

  isApprouved() {
    this.authServ.getUser(localStorage.getItem('idUser')).subscribe((res: any) => {
      this.approuved = res.data.has_uploaded_id;
    })
  }

  cashBack() {
    this.transactionsServ.cashback(this.token).subscribe((res: any) => {
      this.cashback = 0;
    })
  }

  switchLang(val: string) {
    this.translateServ.use(val);
  }

  onClickedOutside(e: any) {
    if ((e.screenX > 250) && (e.screenY > 300)) {
      this.isCollapsed = false;
      this.settings = false;
    }
  }

  showDetails(item: any) {
    this.profiledetails = !this.profiledetails;
    this.selectedItem = item;
  }

  showParams() {
    this.isCollapsed = !this.isCollapsed;
  }

  selectedNav() {
    this.isCollapsed = false;
  }

  showSetting() {
    if (localStorage.getItem('idUser') != undefined && localStorage.getItem('idUser') != null) {
      this.isApprouved();
    }
    this.settings = !this.settings;
  }

   logout() {
this.block=false
    this.authServ.logout();
    this.route.navigate(['/']);
    this.isCollapsed = false;
    // this.socket.disconnect();
    this.userConnected = false;
    this.userParamsServ.game.next(true)
    this.userParamsServ.miniGames.next(true)
    this.userParamsServ.sport.next(true)
    // return this.socket.disconnect()
  }

  getUserName() {
    if (localStorage.getItem("name") == undefined) {
      this.authServ.connectedUser.subscribe((data: any) => {
        if (this.isLoggedIn) {
          this.username = data.username;
        }
      })
    }

    if (!this.username) {
      this.username = localStorage.getItem("name")
    }
  }

}
