import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { UserParamsService } from 'src/app/core/services/user-params.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit, OnDestroy {
  element: HTMLElement = document.getElementById('navbar');
  element2: HTMLElement;
  element3: HTMLElement;

  InMaintenance
  currentRoot
  constructor(
    private authServ: AuthService,
    private router: Router,
    private userParamsServ: UserParamsService,
    private socketServ: SocketService) {
    this.authServ.root.subscribe(res => {
      this.currentRoot = res
    })

    if (this.currentRoot == undefined) {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
          this.currentRoot = event.url;
        });
    }

  }

  ngOnInit(): void {
    this.authServ.logout();
    this.socketServ.getStatus()
    if (this.socketServ.statusSC.site) {
      this.authServ.logout()
      this.element.style.display = "none"
      // this.element2 = document.getElementById('message')
      // this.element2.style.display = "none"

    } else {
      if (this.currentRoot == "/maintenance") {
        this.router.navigate(["/home"])
      }
    }

  }

  ngOnDestroy() {
    this.element.style.display = "block";
    this.userParamsServ.game.next(true)
    this.userParamsServ.gameShow.next(true)
    this.userParamsServ.virtuel.next(true)
  }

}
