import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { GamesService } from 'src/app/services/games/games.service';
import { GameModalComponent } from '../../mobile/game-modal/game-modal.component';

@Component({
  selector: 'app-casino',
  templateUrl: './casino.component.html',
  styleUrls: ['./casino.component.css']
})
export class CasinoComponent implements OnInit {
  title = "Casino"
  pageSize = 20;
  games: any
  pagination: any
  page: any = 0;
  listGame = [];
  limitscrollPage = 500;
  lim = 10
  //-- serche values
  name = new BehaviorSubject<string>('');
  castName = '';
  provider = '';
  category = '';

  providersList;

  listCategory: any;
  selectedCategory = "allGames";
  selectedProvider = "All providers"
  searchVal = '';
  maintain: boolean;

  constructor(
    private gameServ: GamesService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private translatServ: TranslateService,
    private authServ: AuthService) { }

  ngOnInit(): void {
    this.listGame = [];
    this.page = 0;
    this.getCategories();
    this.getProviders();

    this.getCasinoGames(this.page, '')

    this.authServ.casinoMaintain.subscribe((res: boolean) => {
      this.maintain = res;
      if(res){
        this.modalService.dismissAll();
      }
    })

  }

  search(val) {
    if (val != '') {
      this.page = 0;
      this.listGame = [];
      this.limitscrollPage = 500;
      this.end = false;
      this.getCasinoGames(this.page, val);
    }
  }

  end = false
  getCasinoGames(page, name) {
    if (name == undefined) {
      name = ''
    }

    if (!this.end) {
      this.gameServ.getCasiinoGames(page, this.pageSize, name, this.category, this.provider).subscribe((res: any) => {
        this.pagination = res.data
        this.games = this.pagination.items

        this.games.forEach(element => {
          this.listGame.push(element)
        });

        if (this.page < this.pagination.totalPages - 1) {
          this.page += 1;
        } else {
          this.end = true
        }
      })
    }
  }

  onScroll(e) {
    if (e.currentScrollPosition >= this.limitscrollPage) {
      this.limitscrollPage += 490;
      this.getCasinoGames(this.page, this.castName);
    }
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
    modalRef.componentInstance.casinoid = game.casino_id;
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.gameName = gameName;
    modalRef.componentInstance.background = image;
    modalRef.componentInstance.type = game.type;
    modalRef.result.then((result) => {

    }).catch((error) => {
      console.log(error);
    });
  }

  getProviders() {
    this.gameServ.getProvider(0).subscribe((res: any) => {
      this.providersList = res.data;
    })
  }

  getCategories() {
    this.gameServ.getAllCategory().subscribe((res: any) => {
      this.listCategory = res.data;
    })
  }

  getCategoryFilter(category) {
    this.page = 0;
    this.category = category;
    this.selectedCategory = category;
    this.listGame = [];
    this.limitscrollPage = 500;
    this.end = false;
    this.getCasinoGames(this.page, '')
  }

  getProvider(provider) {
    this.page = 0;
    this.provider = provider;
    this.listGame = [];
    this.limitscrollPage = 500;
    this.end = false;
    this.getCasinoGames(this.page, '')
  }

  getAllGames() {
    this.category = '';
    this.provider = '';
    this.page = 0;
    this.listGame = [];
    this.limitscrollPage = 500;
    this.selectedCategory = 'allGames';
    this.end = false;
    this.getCasinoGames(this.page, '')
  }

}
