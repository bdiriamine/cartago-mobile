import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matchslid',
  templateUrl: './matchslid.component.html',
  styleUrls: ['./matchslid.component.css']
})
export class MATCHslidComponent implements OnInit {
  matchs :any
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("https://sport.carthagobet.tn/Live/GetFiveLiveMatch?langId=16&partnerId=130&countryCode=TN").subscribe((response: any) => {
      this.matchs=response
    });
  }

}
