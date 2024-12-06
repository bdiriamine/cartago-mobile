import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameShowRoutingModule } from './game-show-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderInterceptor } from '../core/interceptor/header.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GameShowRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
  ]
})
export class GameShowModule { }
