import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-sport-digi',
  templateUrl: './sport-digi.component.html',
  styleUrls: ['./sport-digi.component.css']
})
export class SportDigiComponent implements OnInit {
  isLoggedIn = false
  token: string;
  iframSport:SafeResourceUrl;
  constructor(private authServ: AuthService,private _sanitizationService: DomSanitizer) {
    this.authServ.getip()
  }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken') != null && localStorage.getItem('accessToken') != undefined) {
            // this.element7.style.display = "none"
            this.isLoggedIn = true;
            setTimeout(() => {
              this.token = localStorage.getItem("accessToken")
              this.authServ.sportDIGI(1).subscribe((res: any) => {
                var script = document.createElement("script");
          script.innerHTML = `    (function (d, s, id) {
            function startGameLoader() {
                function SportLogin() {
                    alert('SportLogin');
                };
        
                function SportRegistration() {
                    alert('SportRegistration');
                };
                var _sp = {
                    "server": "https://sport.carthagobet.tn/",
                    "defaultLanguage": "fr",
                    "containerId": "egamings_container",
                    "unHideOverflow": "1",
                    "newVersion": "1",
                    "partner": "153",
                    "token": "`+res.data+`"
                };
                Bootstrapper.bootIframe(_sp, {
                    name: 'Mobile'
                });
            };
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                startGameLoader();
            } else {
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://sport.carthagobet.tn/js/partner/bootstrapper.min.js';
                fjs.parentNode.insertBefore(js, fjs);
                js.onload = startGameLoader;
            }
        })(document, 'script', 'fundist-digitain-loader');
       
          `;
          document.body.appendChild(script);
              })
            }, 100);
    } else {
     
      setTimeout(() => {
        
        var script = document.createElement("script");
        script.innerHTML = `    (function (d, s, id) {
          function startGameLoader() {
              function SportLogin() {
                  alert('SportLogin');
              };
      
              function SportRegistration() {
                  alert('SportRegistration');
              };
              var _sp = {
                  "server": "https://sport.carthagobet.tn/",
                  "defaultLanguage": "fr",
                  "containerId": "egamings_container",
                  "unHideOverflow": "1",
                  "newVersion": "1",
                  "partner": "153",
              };
              Bootstrapper.bootIframe(_sp, {
                  name: 'Mobile'
              });
          };
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
              startGameLoader();
          } else {
              js = d.createElement(s);
              js.id = id;
              js.src = 'https://sport.carthagobet.tn/js/partner/bootstrapper.min.js';
              fjs.parentNode.insertBefore(js, fjs);
              js.onload = startGameLoader;
          }
      })(document, 'script', 'fundist-digitain-loader');
     
        `;
        document.body.appendChild(script);
      }, 100);

     
    }

  }
}


