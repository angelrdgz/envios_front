import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppBodyComponent } from './layouts/app-body/app-body.component';
import { SiteBodyComponent } from './layouts/site-body/site-body.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { QuoteComponent } from './site/quote/quote.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './shipments/list/list.component';
import { NewShipmentComponent } from './shipments/new-shipment/new-shipment.component';

import { ListPackagesComponent } from './packages/list-packages/list-packages.component';
import { NewPackageComponent } from './packages/new-package/new-package.component';
import { EditPackageComponent } from './packages/edit-package/edit-package.component';



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
      },
      {
        path: 'shipments',
        component: ListComponent,
        pathMatch: 'full',
      },
      {
        path: 'shipments/new',
        component: NewShipmentComponent,
        pathMatch: 'full',
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
      }
    ]
  },
  {
    path: '',
    component: SiteBodyComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
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
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
