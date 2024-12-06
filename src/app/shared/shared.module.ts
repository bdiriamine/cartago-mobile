import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ResponsibleGamingComponent } from './responsible-gaming/responsible-gaming.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AmlPolicyComponent } from './aml-policy/aml-policy.component';
import { Page404Component } from './page404/page404.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PubComponent } from './pub/pub.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterComponent } from './register/register.component';
import { JackpotPrizesComponent } from './jackpot-prizes/jackpot-prizes.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';
import { ChatComponent } from '../user/chat/chat.component';
import { CashbackTermsComponent } from './cashback-terms/cashback-terms.component';
import { TermsModalComponent } from './terms-modal/terms-modal.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { JackpotWinnerComponent } from './jackpot-winner/jackpot-winner.component';
import { ElementMaintainComponent } from './element-maintain/element-maintain.component';

export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    FooterComponent,
    TermsAndConditionsComponent,
    ResponsibleGamingComponent,
    PrivacyPolicyComponent,
    AmlPolicyComponent,
    Page404Component,
    PubComponent,
    ContactUsComponent,
    RegisterComponent,
    JackpotPrizesComponent,
    ChatComponent,
    CashbackTermsComponent,
    TermsModalComponent,
    MaintenanceComponent,
    JackpotWinnerComponent,
    ElementMaintainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule
  ],
  exports:[FooterComponent, PubComponent, ContactUsComponent,RegisterComponent, JackpotPrizesComponent, ChatComponent,ElementMaintainComponent]
})
export class SharedModule {
 }
