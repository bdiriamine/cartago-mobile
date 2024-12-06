import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-esport',
  templateUrl: './esport.component.html',
  styleUrls: ['./esport.component.css']
})
export class EsportComponent implements OnInit {

  link;
  token;
  language;
  constructor(private translate: TranslateService) { 
    // this.translate.currentLang = 'en',
    this.token = localStorage.getItem('accessToken');
    this.language = this.translate.currentLang;
  }

  ngOnInit() {
   
    this.link = "https://sportnew.inplaynet.tech/mobile/?token=" + this.token + "&c=carthago&brand=81&lang=en#/esport";
  }

}
