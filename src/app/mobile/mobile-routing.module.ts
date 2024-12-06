import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmoutGuard } from '../core/guards/amout/amout.guard';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { LoggGuard } from '../core/guards/logg/logg.guard';
import { GameGuard } from '../core/guards/user-params/game.guard';
import { GameshowGuard } from '../core/guards/user-params/gameshow.guard';
import { MiniGamesGuard } from '../core/guards/user-params/mini-games.guard';
import { VirtualGuard } from '../core/guards/user-params/virtual.guard';
import { ContactUsComponent } from '../shared/contact-us/contact-us.component';
import { RegisterComponent } from '../shared/register/register.component';
import { UploadImagesComponent } from '../user/upload-images/upload-images.component';
import { EsportComponent } from './esport/esport.component';
import { FiableGameComponent } from './fiable-game/fiable-game.component';
import { JackPotComponent } from './jack-pot/jack-pot.component';
import { LiveScoreComponent } from './live-score/live-score.component';
import { MiniGamesComponent } from './mini-games/mini-games.component';
import { MobileComponent } from './mobile/mobile.component';
import { VirtualComponent } from './virtual/virtual.component';
import { XgameComponent } from './xgame/xgame.component';

const routes: Routes = [
  {
    path: '',
    component: MobileComponent,
    children: [
      { path: 'virtual', component: VirtualComponent, canActivate: [AmoutGuard, VirtualGuard] },
      { path: 'jack-pot', component: JackPotComponent, canActivate: [AmoutGuard] },
      { path: 'live-score', component: LiveScoreComponent },
      { path: 'mini-games', component: MiniGamesComponent, canActivate: [AmoutGuard, MiniGamesGuard] },
      { path: 'squid-game', component: FiableGameComponent, canActivate: [AmoutGuard, MiniGamesGuard] },
      { path: 'x-games', component: XgameComponent, canActivate: [AmoutGuard, MiniGamesGuard] },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'register', component: RegisterComponent, canActivate: [LoggGuard] },
      { path: 'esport', component: EsportComponent },
      { path: 'upload-images', component: UploadImagesComponent, canActivate: [AuthGuard] },
      { path: 'casino', loadChildren: () => import('../games/games.module').then(m => m.GamesModule), canActivate: [AmoutGuard, GameGuard] },
      { path: 'live-casino', loadChildren: () => import('../game-show/game-show.module').then(m => m.GameShowModule), canActivate: [AmoutGuard, GameshowGuard] },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
