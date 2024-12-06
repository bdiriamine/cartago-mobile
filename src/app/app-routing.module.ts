import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { LoggGuard } from './core/guards/logg/logg.guard';
import { ModeGuard } from './core/guards/mode.guard';
import { SportGuard } from './core/guards/user-params/sport.guard';
import { LoginComponent } from './header-free/login/login.component';
import { AmlPolicyComponent } from './shared/aml-policy/aml-policy.component';
import { CashbackTermsComponent } from './shared/cashback-terms/cashback-terms.component';
import { ElementMaintainComponent } from './shared/element-maintain/element-maintain.component';
import { MaintenanceComponent } from './shared/maintenance/maintenance.component';
import { Page404Component } from './shared/page404/page404.component';
import { PrivacyPolicyComponent } from './shared/privacy-policy/privacy-policy.component';
import { ResponsibleGamingComponent } from './shared/responsible-gaming/responsible-gaming.component';
import { TermsAndConditionsComponent } from './shared/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./mobile/mobile.module').then(m => m.MobileModule),
    canActivate: [ModeGuard]
  },
  {
    path: 'sports',
    loadChildren: () => import('./sports/sports.module').then(m => m.SportsModule),
    canActivate: [ModeGuard, SportGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard, ModeGuard]
  },
  { path: 'terms&conditions', component: TermsAndConditionsComponent, canActivate: [ModeGuard] },
  { path: 'responsible-gaming', component: ResponsibleGamingComponent, canActivate: [ModeGuard] },
  { path: 'privacy-policy', component: PrivacyPolicyComponent, canActivate: [ModeGuard] },
  { path: 'aml-privacy', component: AmlPolicyComponent, canActivate: [ModeGuard] },
  { path: "cashback-terms", component: CashbackTermsComponent, canActivate: [ModeGuard] },
  { path: 'maintenance', component: MaintenanceComponent },
  {
    path: 'login',
    loadChildren: () => import('./header-free/header-free.module').then(m => m.HeaderFreeModule),
    canActivate: [LoggGuard]
  },
  { path: '**', component: Page404Component, canActivate: [ModeGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
