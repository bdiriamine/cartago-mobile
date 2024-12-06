import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {
  // link;
  // token;
  constructor(private authServ: AuthService) { }

  ngOnInit(): void {
    // this.token = localStorage.getItem('accessToken');
    // this.link = " https://sportnew.inplaynet.tech/mobile/?token=" + this.token + "&c=carthago&brand=81&lang=en#/live";

    if (localStorage.getItem('accessToken') != null && localStorage.getItem('accessToken') != undefined) {
      this.authServ.sportToken().subscribe((res: any) => {
        var script = document.createElement("script");
        script.innerHTML = `
       var options = {"token":"${res.Response}","skinid":"carthagobet","mobile":false,"walletcode":"107201","lang":"fr-FR","page":"vflm","betProduct":"live,prelive,vflm","fixedTop":"67","banners":{"bottomRight":{"url":"","link":""}}};
       options["reloadCallback"] = function(){window.location.reload(TRUE);};
       var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
       var oldVw = vw;
       if (vw >= 1100) {
           options["fixedTop"] = 138;
                   } else {
           options["fixedTop"] = 67;
                   }
       var BIA = new AltenarSportsbook("#sportbetContainer", options);
       function adjustSportsbook() {
           var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
           if ((vw >= 1100 && oldVw < 1100) || (vw < 1100 && oldVw >= 1100)) {
               var fixedTop = 67;
               if (vw >= 1100) {
                   fixedTop = 138;
                           }
               BIA.setParam("fixedTop", fixedTop);
               var body = document.getElementsByTagName("body");
               body[0].style.marginTop = fixedTop + "px";
                       }
                       oldVw = vw;
           return false;
       }
       window.addEventListener("resize", adjustSportsbook);`;
        document.head.appendChild(script);
      })
    } else {
      var script = document.createElement("script");
      script.innerHTML = `
      var options = {"token":"null","skinid":"carthagobet","mobile":false,"walletcode":"107201","lang":"fr-FR","page":"vflm","betProduct":"live,prelive,vflm","fixedTop":"67","banners":{"bottomRight":{"url":"","link":""}}};
      options["reloadCallback"] = function(){window.location.reload(TRUE);};
      var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      var oldVw = vw;
      if (vw >= 1100) {
          options["fixedTop"] = 138;
                  } else {
          options["fixedTop"] = 67;
                  }
      var BIA = new AltenarSportsbook("#sportbetContainer", options);
      function adjustSportsbook() {
          var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
          if ((vw >= 1100 && oldVw < 1100) || (vw < 1100 && oldVw >= 1100)) {
              var fixedTop = 67;
              if (vw >= 1100) {
                  fixedTop = 138;
                          }
              BIA.setParam("fixedTop", fixedTop);
              var body = document.getElementsByTagName("body");
              body[0].style.marginTop = fixedTop + "px";
                      }
                      oldVw = vw;
          return false;
      }
      window.addEventListener("resize", adjustSportsbook);`;
      document.head.appendChild(script);
    }
  }

}