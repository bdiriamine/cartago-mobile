import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderFreeRoutingModule } from './header-free-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';


@NgModule({
  declarations: [
    LoginComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    HeaderFreeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class HeaderFreeModule { }
