import { Component, NgZone, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { GamesService } from 'src/app/services/games/games.service';
import { GameModalComponent } from '../../mobile/game-modal/game-modal.component';

@Component({
  selector: 'app-casino-live',
  templateUrl: './casino-live.component.html',
  styleUrls: ['./casino-live.component.css']
})
export class CasinoLiveComponent implements OnInit {
  pageSize = 20;
  games: any
  pagination: any
  notEmpty = true
  notScrolly = true
  page: any = 0;
  listGame = [];
  // allGamesPages = 0;
  limitscrollPage = 500;
  lim = 10
  totalIPages;
  //-- serche values
  name = new BehaviorSubject<string>('');
  castName;
  provider = '';
  category = '';

  providersList;
  tabLength;
  haveName: boolean = false;

  windowHeigth;
  scrollPosition;

  listCategory: any;
  selectedCategory = "allGames";
  searchVal = '';

  selectedProvider = "All providers";
  maintain: boolean;

  title="Game show"

  constructor(
    private gameServ: GamesService,
    private modalService: NgbModal,
    private translatServ: TranslateService,
    private toastrService: ToastrService,
    private authServ:AuthService) { }

  ngOnInit(): void {
    this.page = 0;
      this.listGame = [];
    this.getCategories();
    this.getProviders();

    this.windowHeigth = window.innerHeight - 176;

    this.name.subscribe(res => {
      this.castName = res;
      if (res) {
        this.page = 0;
        this.listGame = [];
        this.limitscrollPage = 500;
        this.getCasinoGames(this.page, this.castName)
      } else {
        this.page = 0;
        this.listGame = [];
        this.limitscrollPage = 500;
        this.getCasinoGames(this.page, this.castName = '')
      }
    })

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
      this.getCasinoGames(this.page, val)
    }
  }
  end = false
  getCasinoGames(page, name) {
    if (name == undefined) {
      name = ''
    }
    if (!this.end) {
      this.gameServ.getLiveCasinoGames(page, this.pageSize, name, this.category, this.provider).subscribe((res: any) => {
        if (res) {
          this.pagination = res.data
          this.games = this.pagination.items
          this.tabLength = this.listGame.length
          this.games.forEach(element => {
            this.listGame.push(element)
          });

          if (this.page < this.pagination.totalPages - 1) {
            this.page += 1;
          } else {
            this.end = true
          }
        }
      })
    }


  }


  onScroll(e) {
    if (e.currentScrollPosition >= this.limitscrollPage) {
      this.limitscrollPage += 490;
      this.getCasinoGames(this.page, this.castName)
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
    modalRef.componentInstance.game = game;
    modalRef.componentInstance.type = game.type;
    modalRef.componentInstance.gameName = gameName;
    modalRef.componentInstance.background = image;

    modalRef.result.then((result) => {

    }).catch((error) => {
      console.log(error);
    });
  }

  getKeyValue(name) {
    this.name.next(name.target.value);
  }

  getProviders() {
    this.gameServ.getProvider(1).subscribe((res: any) => {
      this.providersList = res.data;
    })
  }

  getCategories() {
    this.gameServ.getAllCategory().subscribe((res: any) => {
      this.listCategory = res.data;
    })
  }

  getCategoryFilter(category) {
    this.end = false;
    this.category = category;
    this.selectedCategory = category;
    this.page = 0;
    this.listGame = [];
    this.limitscrollPage = 500;
    this.getCasinoGames(this.page, '')
  }

  getProvider(provider) {
    this.end = false;
    this.provider = provider;
    this.page = 0;
    this.listGame = [];
    this.limitscrollPage = 500;
    this.getCasinoGames(this.page, '')
  }
  getAllGames() {
    this.end = false;
    this.category = '';
    this.provider = '';
    this.page = 0;
    this.listGame = [];
    this.limitscrollPage = 500;
    this.selectedCategory = 'allGames';
    this.getCasinoGames(this.page, '')
  }
}
