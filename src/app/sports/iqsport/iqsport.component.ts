import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-iqsport',
  templateUrl: './iqsport.component.html',
  styleUrls: ['./iqsport.component.css']
})
export class IqsportComponent implements OnInit {
  title="Sport"
  innerWidth: any;
  iSport: any;
  maintain: boolean;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  constructor(private _sanitizationService: DomSanitizer, public translate: TranslateService, private sanitizer: DomSanitizer, private authServ: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.authServ.sportMaintain.subscribe((res: boolean) => {
      this.maintain = res
    });

    if (localStorage.getItem('accessToken') != null && localStorage.getItem('accessToken') != undefined) {
      this.http.post(environment.apiSport + "api/game/open", {
        "game_id": 1007,
        "client_type": "mobile",
        "token": localStorage.getItem('accessToken'),
        "website": "carthago"
      }).subscribe((result: any) => {
        this.iSport = this._sanitizationService.bypassSecurityTrustResourceUrl("https://sportsbookwebsite.iqsoft.am/website/prematch/home?partnerid=37&languageid=EN&token=" + result.data.token + "&isForMobile=true")
      })

    } else {
      this.iSport = this._sanitizationService.bypassSecurityTrustResourceUrl("https://sportsbookwebsite.iqsoft.am/website/prematch/home?partnerid=37&languageid=EN&&isForMobile=true")
    }
  }

}
