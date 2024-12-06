import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { MinigamesService } from 'src/app/services/miniGames/minigames.service';

@Component({
  selector: 'app-fiable-game',
  templateUrl: './fiable-game.component.html',
  styleUrls: ['./fiable-game.component.css']
})
export class FiableGameComponent implements OnInit {
  title = "Mini games"
  maintain: any;
  fbGames: any;
  token: any;
  constructor(private miniS: MinigamesService, private toastrServ: ToastrService, private authServ: AuthService,) {
    this.token = localStorage.getItem("accessToken")
  }

  ngOnInit(): void {
    this.authServ.miniGamesMaintain.subscribe((res: boolean) => this.maintain = res)
    this.miniS.getfbgames().subscribe((res: any) => { this.fbGames = res.data })
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
