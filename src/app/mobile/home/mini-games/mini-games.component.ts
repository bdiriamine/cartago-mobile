import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { MinigamesService } from 'src/app/services/miniGames/minigames.service';

@Component({
  selector: 'app-mini-games',
  templateUrl: './mini-games.component.html',
  styleUrls: ['./mini-games.component.css']
})
export class MiniGamesComponent implements OnInit {
  miniTopGAMES2 = [{
    url: 'https://res.cloudinary.com/d-shine/image/upload/v1635164608/Games/DIno/vignette-dino-mystake-game-casino_ynlfrn.png',

  },
  {
    url: '../../../assets/images/mini-games/chik.jpg',
  },
  {
    url: '../../../assets/images/mini-games/hilo-cards-withArrows.png',
  }]

  maintain: boolean;
  token: string;
  dino: string;

  constructor(
    private toastrServ: ToastrService, 
    private authServ: AuthService,
    private miniS: MinigamesService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("accessToken")
    this.authServ.miniGamesMaintain.subscribe((res: boolean) => this.maintain = res);
    this.dino = "https://games.upgaming.com/games/dino/?companyName=carthago&integration=public&Token=" + this.token
  }

  dinoo() {
    if (this.token == undefined || this.token == null) {
      this.toastrServ.info('You should be logged in to open the game')
    } else {
      window.location.href = this.dino;
    }
  }

  openNewGame(gameName: string, category: string) {
    if (this.token == undefined || this.token == null) {
      this.toastrServ.info('You should be logged in to open the game')
    } else {
      window.location.href = "https://server.ssg-public.com/GameLauncher/Loader.aspx?GameCategory=" + category + "&GameName=" + gameName + "&Token=" + this.token + "&PortalName=inbet&lang=en&returnUrl=https://m.carthagobet.tn/#/mini-games";
    }
  }

  openModal(gameurl) {
    if (this.token) {
      this.miniS.openGamefiable(gameurl).subscribe((res: any) => {
        window.location.href = res.data
      })
    } else {
      this.toastrServ.info("You have to login before you play");
    }
  }

}
