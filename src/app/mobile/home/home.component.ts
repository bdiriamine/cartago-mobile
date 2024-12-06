import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { SocketService } from 'src/app/core/services/socket.service';
import { UserParamsService } from 'src/app/core/services/user-params.service';
import { GamesService } from 'src/app/services/games/games.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topGames: any = [];
  topGames1: any = [];
  topGames2: any = [];
 
  isLoggedIn;

  config: SwiperOptions = {
    loop: true,
    autoplay: {
      delay: 5000,
    },
    slidesPerView: 3,
    breakpoints: {
      200: {
        slidesPerView: 2,
      },
      300: {
        slidesPerView: 3,
      },
      400: {
        slidesPerView: 4,
      },
      500: {
        slidesPerView: 5,
      },
      600: {
        slidesPerView: 6,
      },
      700: {
        slidesPerView: 7,
      }
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,

    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 2
  };

  blocked = false;
  game = true;
  gameShow = false;
  virtuel = false;
  jackpot = false;
  miniGames = true;
  sport = true;

  constructor(
    private gameServ: GamesService,
    private authServ: AuthService,
    private socketServ: SocketService,
    private userParamsServ: UserParamsService) { }

  async ngOnInit() {
    await this.userParamsServ.game.subscribe(res => this.game = res);
    await this.userParamsServ.gameShow.subscribe(res => this.gameShow = res);
    await this.userParamsServ.virtuel.subscribe(res => this.virtuel = res);
    await this.userParamsServ.jackpot.subscribe(res => this.jackpot = res);
    await this.userParamsServ.miniGames.subscribe(res => this.miniGames = res);
    await this.userParamsServ.sport.subscribe(res => {
      this.sport = res
    });
    this.socketServ.blocked.subscribe((data: boolean) => {
      this.blocked = data;
    })
    this.getTopGames()
    this.isLoggedIn = this.authServ.isLoggedIn();

    this.authServ.signedIn.subscribe((res: any) => {
      if (res == true) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }
  
  onSlideChange() {
  }

  onSwiper(swiper) {
  }

  getTopGames() {
    this.gameServ.getTopGames().subscribe((res: any) => {
      this.topGames = res.data
      if (this.topGames.length % 2 == 0) {
        for (let i = 0; i <= Math.floor(this.topGames.length / 2); i++) {
          this.topGames1.push(this.topGames[i])
        }
        for (let i = Math.floor(this.topGames.length / 2) + 1; i <= this.topGames.length - 1; i++) {
          this.topGames2.push(this.topGames[i])
          // this.topGames = res.data
        }
      } else {
        for (let i = 0; i <= Math.floor(this.topGames.length / 2); i++) {
          this.topGames1.push(this.topGames[i])
        }

        for (let j = Math.floor(this.topGames.length / 2) + 1; j < this.topGames.length - 1; j++) {
          this.topGames2.push(this.topGames[j])
        }
      }
    })

  }

}
