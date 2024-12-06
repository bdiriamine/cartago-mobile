import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmoutGuard } from '../core/guards/amout/amout.guard';
import { GameGuard } from '../core/guards/user-params/game.guard';
import { CasinoComponent } from './casino/casino.component';

const routes: Routes = [
  { path: '', component: CasinoComponent , canActivate: [AmoutGuard, GameGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
