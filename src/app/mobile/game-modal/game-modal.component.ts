import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/core/services/socket.service';
import { GamesService } from 'src/app/services/games/games.service';

@Component({
  selector: 'app-game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.css']
})
export class GameModalComponent implements OnInit {
  @Input() game: any;
  @Input() userid: any;
  @Input() casinoid: any;
  @Input() background: any;
  @Input() gameName: any;
  @Input() type: number;
  iframeUrl;
  fullscreen = false;

  elem: any;
  isFullScreen: boolean;
  blocked: boolean;
  constructor(
    private activeModal: NgbActiveModal,
    private gameServ: GamesService,
    private socketServ: SocketService,
    private router: Router,
    private _sanitizationService: DomSanitizer,
    private translatServ: TranslateService,
    @Inject(DOCUMENT) private document: any,) { }
  isBlocked: boolean


  ngOnInit(): void {
    // this.chkScreenMode();
    this.elem = document.documentElement;
    this.socketServ.blocked.subscribe((data: any) => {
      this.blocked = data
      if(this.blocked){
        this.closeModal();
      }
    })
    if (!this.blocked) {
      this.openGame();
    } else {
      this.closeModal();
      this.router.navigate(['/'])
    }
  }

  private translate(txt: string): string {
    return this.translatServ.instant(txt);
  }

  openGame() {

      if (this.type == 2) {
        this.gameServ.openGame(this.userid, this.game.identifier).subscribe((res: any) => {
          this.iframeUrl = res.data;
          this.iframeUrl = this._sanitizationService.bypassSecurityTrustResourceUrl(this.iframeUrl)
        })
      } else if (this.type == 1) {
        this.gameServ.openGapiGame(this.userid, this.game.menu_title).subscribe((res: any) => {
          this.iframeUrl = res.data;
          this.iframeUrl = this._sanitizationService.bypassSecurityTrustResourceUrl(this.iframeUrl)

        })
      }else if (this.type == 4) {
        this.gameServ.openSmartSoftGame(this.game.categoryMobile, this.game.name).subscribe((res: any) => {
          this.iframeUrl = res.data;
          this.iframeUrl = this._sanitizationService.bypassSecurityTrustResourceUrl(this.iframeUrl)

        })
      }
      else if (this.type ==6){
        this.gameServ.getopenGameiq(this.casinoid).subscribe((res: any) => {
          if (res) {
            this.iframeUrl = res.data.ResponseObject;
            this.iframeUrl = this._sanitizationService.bypassSecurityTrustResourceUrl(this.iframeUrl);
            (document.querySelector('html') as HTMLElement).style.overflow = 'hidden';
          }
        })
      }
   
  }

  openGameFullScreen() {
    this.fullscreen = !this.fullscreen;
    const el = document.getElementById('iframe');
    el.requestFullscreen();
  }

  closeModal() {
    const el = document.getElementById('iframe');
    this.fullscreen = !this.fullscreen;
    this.activeModal.close('Modal Closed');
  }
}
