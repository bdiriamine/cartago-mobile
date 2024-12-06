import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MiniGamesComponent } from './mini-games/mini-games.component';
import { ImageslidComponent } from './imageslid/imageslid.component';
import { WinnersComponent } from './winners/winners.component';
import { MATCHslidComponent } from './matchslid/matchslid.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from '../../core/interceptor/header.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LivecasinoComponent } from './livecasino/livecasino.component';
import { CasinoComponent } from './casino/casino.component';


@NgModule({
  declarations: [
    HomeComponent,
    MiniGamesComponent,
    ImageslidComponent,
    WinnersComponent,
    MATCHslidComponent,
    LivecasinoComponent,
    CasinoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
  ]
})
export class HomeModule { }
