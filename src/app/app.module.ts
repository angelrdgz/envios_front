import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { ApiService } from './services/api.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { SiteHeaderComponent } from './layouts/site-header/site-header.component';
import { SiteBodyComponent } from './layouts/site-body/site-body.component';
import { SiteFooterComponent } from './layouts/site-footer/site-footer.component';
import { AppHeaderComponent } from './layouts/app-header/app-header.component';
import { AppBodyComponent } from './layouts/app-body/app-body.component';
import { AppFooterComponent } from './layouts/app-footer/app-footer.component';

import { HomeComponent } from './site/home/home.component';
import { QuoteComponent } from './site/quote/quote.component';
import { ListComponent } from './shipments/list/list.component';
import { AppAsideComponent } from './layouts/app-aside/app-aside.component';
import { AppContainerComponent } from './layouts/app-container/app-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewShipmentComponent } from './shipments/new-shipment/new-shipment.component';
import { NewPackageComponent } from './packages/new-package/new-package.component';
import { ListPackagesComponent } from './packages/list-packages/list-packages.component';
import { EditPackageComponent } from './packages/edit-package/edit-package.component';
import { ListLocationsComponent } from './locations/list-locations/list-locations.component';
import { ListRechargesComponent } from './recharges/list-recharges/list-recharges.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SiteHeaderComponent,
    SiteBodyComponent,
    SiteFooterComponent,
    AppHeaderComponent,
    AppBodyComponent,
    AppFooterComponent,
    HomeComponent,
    QuoteComponent,
    ListComponent,
    AppAsideComponent,
    AppContainerComponent,
    DashboardComponent,
    NewShipmentComponent,
    NewPackageComponent,
    ListPackagesComponent,
    EditPackageComponent,
    ListLocationsComponent,
    ListRechargesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
