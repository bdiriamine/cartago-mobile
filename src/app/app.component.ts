import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Observer, Subject } from 'rxjs';
import io from 'node_modules/socket.io-client/dist/socket.io';
import { AuthService } from './core/services/auth.service';
import { environment } from 'src/environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SocketService } from './core/services/socket.service';
import { Maintain } from './core/models/Maintain';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cartago-mobile';
  mode: boolean;
  loader = false;
  isLoggedIn: boolean;

  maintenance: any;
  currentRoot
  maintenanceSocketBol: boolean;
  SOC_URL = environment.socketUrl;

  test: boolean;
  status
  socket: io.Socket;
  inMaintenance: boolean;

  constructor(
    private translate: TranslateService,
    private authServ: AuthService,
    private router: Router,
    private socketServ: SocketService,
    private modalServ: NgbModal) {
    this.authServ.signedIn.subscribe((res: any) => {
      if (res == true) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  ngOnInit() {
    this.socketServ.connect()
    this.socketServ.getStatus()
    this.authServ.InMaintenance.subscribe((maintain: Maintain) => {
      if (maintain) {
        this.router.navigate(["maintenance"]);
        this.modalServ.dismissAll();
      } else {
        if (this.router.url === "/maintenance") {
          this.router.navigate(["/home"])
        }
      }
     
    })

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
        this.currentRoot = event.url;
        this.authServ.root.next(this.currentRoot)
      });

    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

}
