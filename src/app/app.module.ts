import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MobileModule } from './mobile/mobile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { SharedModule } from './shared/shared.module';
// import { LocationStrategy } from '@angular/common';
// import { HashChangeLocationStrategy } from 'ngx-hashchange-location-strategy';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { HeaderInterceptor } from './core/interceptor/header.interceptor';
import { SocketIoModule, } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { SwiperModule } from 'swiper/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxImageCompressService } from 'ngx-image-compress';
import { MessageComponent } from './message/message.component';
import { SportsModule } from './sports/sports.module';

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MobileModule,
    RouterModule,
    NgxUsefulSwiperModule,
    SharedModule,
    SocketIoModule,
    SportsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      closeButton: true,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
    }),
     BrowserAnimationsModule,
     SwiperModule,
     HttpClientModule,
  ],
  providers: [
    //  { 
    //    provide: LocationStrategy,
    //    useClass: HashChangeLocationStrategy 
    //   },
   
    NgxImageCompressService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}
