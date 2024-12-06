import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styleUrls: ['./inplay.component.css']
})
export class InplayComponent implements OnInit {
  token;
  lang;
  link;
  fullscreen = false;
  constructor(
    private activeModal: NgbActiveModal,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('accessToken');
    this.lang = this.translate.currentLang;
    this.link = " https://sportnew.inplaynet.tech/mobile/?token=" + this.token + "&c=carthago&brand=81&lang=" + this.lang + "#/virtual";
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
