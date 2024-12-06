import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UploadImagesComponent } from './upload-images/upload-images.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { DRHistoryComponent } from './d-r-history/d-r-history.component';
import { BetHistoryComponent } from './bet-history/bet-history.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderInterceptor } from '../core/interceptor/header.interceptor';
import { MinigamestransactionComponent } from './minigamestransaction/minigamestransaction.component';

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    EditProfileComponent,
    ChangePasswordComponent,
    UploadImagesComponent,
    TransactionsHistoryComponent,
    DRHistoryComponent,
    BetHistoryComponent,
    MinigamestransactionComponent
    ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
  ]
})
export class UserModule { }
