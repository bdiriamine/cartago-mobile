import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmoutGuard } from '../core/guards/amout/amout.guard';
import { GameshowGuard } from '../core/guards/user-params/gameshow.guard';
import { CasinoLiveComponent } from './casino-live/casino-live.component';

const routes: Routes = [
  { path: '', component: CasinoLiveComponent, canActivate: [AmoutGuard, GameshowGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameShowRoutingModule { }
