import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CasinoLiveComponent } from '../game-show/casino-live/casino-live.component';
import { RouterModule } from '@angular/router';
import { DragScrollModule } from 'ngx-drag-scroll';
import { BottomNavsComponent } from './bottom-navs/bottom-navs.component';
import { CasinoComponent } from '../games/casino/casino.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { VirtualComponent } from './virtual/virtual.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { GameModalComponent } from './game-modal/game-modal.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { JackPotComponent } from './jack-pot/jack-pot.component';
import { MobileComponent } from './mobile/mobile.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { LiveScoreComponent } from './live-score/live-score.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from '../core/core.module';
import { MiniGamesComponent } from './mini-games/mini-games.component';
import { InplayComponent } from './inplay/inplay.component';
import { EsportComponent } from './esport/esport.component';
import { HeaderInterceptor } from '../core/interceptor/header.interceptor';
import { XgameComponent } from './xgame/xgame.component';
import { FiableGameComponent } from './fiable-game/fiable-game.component';
import { SearchFilterPipe } from './pipe/search-filter.pipe';

export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    CasinoLiveComponent,
    BottomNavsComponent,
    CasinoComponent,
    VirtualComponent,
    NavBarComponent,
    GameModalComponent,
    JackPotComponent,
    MobileComponent,
    LiveScoreComponent,
    MiniGamesComponent,
    InplayComponent,
    EsportComponent,
    XgameComponent,
    FiableGameComponent,
    SearchFilterPipe
  ],
  imports: [
    CommonModule,
    MobileRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DragScrollModule,
    NgxUsefulSwiperModule,
    SharedModule,
    HttpClientModule,
    InfiniteScrollModule, 
    // ScrollingModule, 
    NgScrollbarModule,
    ClickOutsideModule,
    NgSelectModule,
    TranslateModule,
    CoreModule
  ],
  exports: [NavBarComponent,BottomNavsComponent, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
  ]
})
export class MobileModule { }
