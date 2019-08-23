import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

import { AppBodyComponent } from './layouts/app-body/app-body.component';
import { SiteBodyComponent } from './layouts/site-body/site-body.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SignupComponent } from './signup/signup.component';
import { ActiveAccountComponent } from './auth/active-account/active-account.component';
import { HomeComponent } from './site/home/home.component';
import { QuoteComponent } from './site/quote/quote.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './shipments/list/list.component';
import { NewShipmentComponent } from './shipments/new-shipment/new-shipment.component';

import { ListPackagesComponent } from './packages/list-packages/list-packages.component';
import { NewPackageComponent } from './packages/new-package/new-package.component';
import { EditPackageComponent } from './packages/edit-package/edit-package.component';

import { ListRechargesComponent } from './recharges/list-recharges/list-recharges.component';
import { NewRechargeComponent } from './recharges/new-recharge/new-recharge.component';

import { NewCardComponent } from './cards/new-card/new-card.component';

import { ListLocationsComponent } from './locations/list-locations/list-locations.component';



const routes: Routes = [
  //Site routes goes here 
  {
    path: 'admin',
    component: AppBodyComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: 'shipments',
        component: ListComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]        
      },
      {
        path: 'shipments/new',
        component: NewShipmentComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: 'packages',
        component: ListPackagesComponent,
        pathMatch: 'full',
      },
      {
        path: 'packages/new',
        component: NewPackageComponent,
        pathMatch: 'full',
      },
      {
        path: 'packages/:id/edit',
        component: EditPackageComponent,
        pathMatch: 'full',
      },
      {
        path: 'recharges',
        component: ListRechargesComponent,
        pathMatch: 'full',
      },
      {
        path: 'recharges/new',
        component: NewRechargeComponent,
        pathMatch: 'full',
      },
      {
        path: 'cards/new',
        component: NewCardComponent,
        pathMatch: 'full',
      },
      {
        path: 'locations',
        component: ListLocationsComponent,
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '',
    component: SiteBodyComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },
      {
        path: 'quote',
        component: QuoteComponent,
        pathMatch: 'full',
      },

    ]
  },

  //no layout routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'active-account/:hash', component: ActiveAccountComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
