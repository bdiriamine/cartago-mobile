import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { UserParamsService } from 'src/app/core/services/user-params.service';

@Component({
  selector: 'app-bottom-navs',
  templateUrl: './bottom-navs.component.html',
  styleUrls: ['./bottom-navs.component.css']
})
export class BottomNavsComponent implements OnInit {
  link;
  game;
  gameShow = false;
  miniGames;
  sport
  constructor(private route: Router, private userParamsServ: UserParamsService) {
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
        this.link = event.url;
      });
  }

  ngOnInit(): void {
    this.userParamsServ.game.subscribe(res => { this.game = res });
    this.userParamsServ.gameShow.subscribe(res => this.gameShow = res);
    this.userParamsServ.miniGames.subscribe(res => this.miniGames = res);
    this.userParamsServ.sport.subscribe(res => this.sport = res);
  }

}
