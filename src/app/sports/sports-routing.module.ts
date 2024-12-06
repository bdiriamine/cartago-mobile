import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportGuard } from '../core/guards/user-params/sport.guard';
import { IqsportComponent } from './iqsport/iqsport.component';
import { LiveComponent } from './live/live.component';
import { SportDigiComponent } from './sport-digi/sport-digi.component';

import { SportsComponent } from './sports/sports.component';

const routes: Routes = [
  { path: 'live', component: LiveComponent },
  { path: 'sport', component: SportDigiComponent , canActivate: []},
  { path: 'sport2', component: IqsportComponent, canActivate: [] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsRoutingModule { }
