import { Component, NgZone, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { GamesService } from 'src/app/services/games/games.service';
import { GameModalComponent } from '../game-modal/game-modal.component';

@Component({
  selector: 'app-jack-pot',
  templateUrl: './jack-pot.component.html',
  styleUrls: ['./jack-pot.component.css']
})
export class JackPotComponent implements OnInit {
  games: any
  listGame = [];
  //-- serche values
  name = new BehaviorSubject<string>('');
  searchName : string;
  constructor(
    private gameServ: GamesService,
    private modalService: NgbModal,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getJackpotGames()
  }

  getJackpotGames() {
    this.gameServ.getJackpotGames().subscribe((res: any) => {
      this.listGame = res.data;
    })
  }

  openModal(game, gameName, image, gapi) {
    if (localStorage.getItem('idUser') == undefined) {
      this.toastrService.warning('You should be logged in to open the game', 'Warning');
      return;
    }
    if (game != null) {
      const modalRef = this.modalService.open(GameModalComponent, { size: 'xxl' });
      modalRef.componentInstance.userid = localStorage.getItem('idUser');
      modalRef.componentInstance.game = game;
      modalRef.componentInstance.gapi = gapi;
      modalRef.componentInstance.gameName = gameName;
      modalRef.componentInstance.background = image;
      modalRef.componentInstance.type = game.type;

      modalRef.result.then((result) => {
   
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  getKeyValue(name) {
    this.name.next(name.target.value);
  }


  
}
