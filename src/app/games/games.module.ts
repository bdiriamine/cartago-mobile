import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from '../core/interceptor/header.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GamesRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
  ]
})
export class GamesModule { }
