import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { GamesService } from 'src/app/services/games/games.service';
import { GameModalComponent } from '../game-modal/game-modal.component';
import { InplayComponent } from '../inplay/inplay.component';

@Component({
  selector: 'app-virtual',
  templateUrl: './virtual.component.html',
  styleUrls: ['./virtual.component.css']
})
export class VirtualComponent implements OnInit {
  pageSize = 20;
  games: any
  pagination: any
  page: any = 0;
  listGame = [];
  limitscrollPage = 2000;
  //-- serche values
  name = new BehaviorSubject<string>('');
  provider = '';

  providersList;
  tabLength;
  
  selectedCategory = "allGames";
  selectedProvider = "All providers"

  constructor(
    private gameServ: GamesService,
    private modalService: NgbModal,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getProviders();
    this.getVirtualGames(this.page, '')
  }

  getVirtualGames(page, provider) {
    this.gameServ.getGamesVirtuel(page, provider).subscribe((res: any) => {
      this.pagination = res.data
      this.games = this.pagination.items
      this.tabLength = this.listGame.length
      this.games.forEach(element => {
        this.listGame.push(element)
      });
      if (this.page < this.pagination.totalPages - 1)
        this.page += 1;
    })

    if (this.page < 3) {
      let initialPage = page
      for (let i = 1; i < 4; i++) {
        initialPage += 1;
        this.gameServ.getGamesVirtuel(initialPage, provider).subscribe((res: any) => {
          this.pagination = res.data
          this.games = this.pagination.items
          this.tabLength = this.listGame.length
          this.games.forEach(element => {
            this.listGame.push(element)
          });
          if (this.page < this.pagination.totalPages - 1)
            this.page += 1;
        })
      }
    }
  }

  openModal(game, gameName, image) {
    if (localStorage.getItem('idUser') == undefined) {
      this.toastrService.warning('You should be logged in to open the game', 'Warning');
      return;
    }
    if (game != null) {
      const modalRef = this.modalService.open(GameModalComponent, { size: 'xxl' });
      modalRef.componentInstance.userid = localStorage.getItem('idUser');
      modalRef.componentInstance.game = game;
      modalRef.componentInstance.gameName = gameName;
      modalRef.componentInstance.background = image;
      modalRef.componentInstance.type = game.type;
      modalRef.result.then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  getProviders() {
    this.gameServ.getVirtualProvider().subscribe((res: any) => {
      this.providersList = res.data;
    })
  }

  getProvider(provider) {
    this.provider = provider;
    this.page = 0;
    this.listGame = [];
    this.limitscrollPage = 2000;
    this.getVirtualGames(this.page, '')
  }

  openInplay(){
    const modalRef = this.modalService.open(InplayComponent, { size: 'xxl' });
  }

  getCategoryFilter(provider) {
    this.provider = provider;
    this.selectedProvider = provider;
    this.page = 0;
    this.listGame = [];
    this.limitscrollPage = 2000;
    this.getVirtualGames(this.page, provider)
  }

  getAllCategories() {
    this.page = 0;
    this.listGame = [];
    this.limitscrollPage = 2000;
    this.getVirtualGames(this.page, '')
  }

}
