import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-mini-games',
  templateUrl: './mini-games.component.html',
  styleUrls: ['./mini-games.component.css']
})
export class MiniGamesComponent implements OnInit {
  title = "Mini games"
  token: any
  dino: string;
  chicken: string;
  dice: string;
  hilo: string;
  keno40: string;

  jetX: string;
  maintain: boolean;

  constructor(private toastrServ: ToastrService, private authServ: AuthService) {
    this.token = localStorage.getItem("accessToken")
    this.dino = "https://games.upgaming.com/games/dino/?companyName=carthago&integration=public&Token=" + this.token
    this.chicken = "https://games.upgaming.com/games/chicken/?companyName=carthago&integration=public&Token=" + this.token
    this.dice = "https://games.upgaming.com/games/dice/?companyName=carthago&integration=public&Token=" + this.token
    this.hilo = "https://games.upgaming.com/games/hilo/?companyName=carthago&integration=public&Token=" + this.token
    this.keno40 = "https://games.upgaming.com/games/keno40/?companyName=carthago&integration=public&Token=" + this.token

    this.jetX = "https://www.smartsoftgaming.com/GameDemo/JetX"
  }

  ngOnInit(): void {
    this.authServ.miniGamesMaintain.subscribe((res: boolean) => this.maintain = res)
  }

  dinoo() {
    if (this.token == undefined || this.token == null) {
      this.toastrServ.info('You should be logged in to open the game')
    } else {
      window.location.href = this.dino;
    }
  }

  chickenn() {
    if (this.token == undefined || this.token == null) {
      this.toastrServ.info('You should be logged in to open the game')
    } else {
      window.location.href = this.chicken;
    }

  }

  dicee() {
    if (this.token == undefined || this.token == null) {
      this.toastrServ.info('You should be logged in to open the game')
    } else {
      window.location.href = this.dice;
    }

  }

  hiloo() {
    if (this.token == undefined || this.token == null) {
      this.toastrServ.info('You should be logged in to open the game')
    } else {
      window.location.href = this.hilo;
    }

  }

  kenoo() {
    if (this.token == undefined || this.token == null) {
      this.toastrServ.info('You should be logged in to open the game')
    } else {
      window.location.href = this.keno40;
    }
  }

  openNewGame(gameName: string, category: string) {
    if (this.token == undefined || this.token == null) {
      this.toastrServ.info('You should be logged in to open the game')
    } else {
      window.location.href = "https://server.ssg-public.com/GameLauncher/Loader.aspx?GameCategory=" + category + "&GameName=" + gameName + "&Token=" + this.token + "&PortalName=inbet&lang=en&returnUrl=https://m.carthagobet.tn/#/mini-games";
    }
  }
}