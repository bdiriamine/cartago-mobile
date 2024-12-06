import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SportsRoutingModule } from './sports-routing.module';
import { SportsComponent } from './sports/sports.component';
import { LiveComponent } from './live/live.component';
import { CoreModule } from '../core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { httpTranslateLoader } from '../app.module';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from '../shared/shared.module';
import { HeaderInterceptor } from '../core/interceptor/header.interceptor';
import { IqsportComponent } from './iqsport/iqsport.component';
import { SportDigiComponent } from './sport-digi/sport-digi.component';
export function translateLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    SportsComponent,
    LiveComponent,
    IqsportComponent,
    SportDigiComponent,
  ],
  imports: [
    CommonModule,
    SportsRoutingModule,
    CoreModule,
    TranslateModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
  ]
})
export class SportsModule { }
