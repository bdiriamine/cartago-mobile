import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Game } from 'src/app/core/models/game';
import { JackpotWinnersService } from 'src/app/services/winners/jackpot-winners.service';
import { GameModalComponent } from '../../game-modal/game-modal.component';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})
export class WinnersComponent implements OnInit {
  winnersList;
  constructor(
    private jackpotWinnerServ: JackpotWinnersService,
    private modalService: NgbModal,
    private toasterServ: ToastrService
    ) { }

  ngOnInit(): void {
    this.getWinners();
  }

  getWinners() {
    this.jackpotWinnerServ.getWinners().subscribe((res: any) => {
      if (res) {
        this.winnersList = res.data;
      }
    })
  }

  openGame(game: Game){
    if(localStorage.getItem('accessToken') != undefined){
    const modalRef = this.modalService.open(GameModalComponent, { size: 'xxl' });
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.name = game.game_name;
    modalRef.componentInstance.type = 2;
    modalRef.componentInstance.userid = localStorage.getItem('idUser')

  } else {
    this.toasterServ.error('Oops', 'Sorry, You should be logged in!')
  }
  }

}
