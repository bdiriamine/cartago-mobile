import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { BetHistoryComponent } from './bet-history/bet-history.component';
import { DRHistoryComponent } from './d-r-history/d-r-history.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { MinigamestransactionComponent } from './minigamestransaction/minigamestransaction.component';

const routes: Routes = [
  { path: 'profile', component: EditProfileComponent},
  { path: 'transactions-history', component: TransactionsHistoryComponent},
  { path: 'd-r-history', component: DRHistoryComponent},
  { path: 'bet-history', component: BetHistoryComponent},
  { path: 'Mini-history', component: MinigamestransactionComponent},
  { path: 'chat', component: ChatComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
