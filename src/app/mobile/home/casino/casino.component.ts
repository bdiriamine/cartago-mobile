import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { GameModalComponent } from 'src/app/mobile/game-modal/game-modal.component';
import { GamesService } from 'src/app/services/games/games.service';

@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.css']
})
export class CasinoComponent implements OnInit {
  listGames;
  constructor(
    private gameServ: GamesService,
    private toastrService: ToastrService,
    private translatServ: TranslateService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getGames()
  }

  getGames(){
    this.gameServ.getHomeGames(0).subscribe((res: any) => {
      this.listGames = res.data.items
    })
  }

  private translate(txt: string): string {
    return this.translatServ.instant(txt);
  }

  openModal(game, gameName, image) {
    if (localStorage.getItem('idUser') == undefined) {
      this.toastrService.warning(this.translate('You should be logged in to open the game'), 'Warning');
      return;
    }

    const modalRef = this.modalService.open(GameModalComponent, { size: 'xxl' });
    modalRef.componentInstance.userid = localStorage.getItem('idUser');
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.gameName = gameName;
    modalRef.componentInstance.background = image;
    modalRef.componentInstance.type = game.type;
    modalRef.result.then((result) => {
    }).catch((error) => {
      console.log(error);
    });
  }

}
