import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { ApiService } from './services/api.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';

import { SiteHeaderComponent } from './layouts/site-header/site-header.component';
import { SiteBodyComponent } from './layouts/site-body/site-body.component';
import { SiteFooterComponent } from './layouts/site-footer/site-footer.component';
import { AppHeaderComponent } from './layouts/app-header/app-header.component';
import { AppBodyComponent } from './layouts/app-body/app-body.component';
import { AppFooterComponent } from './layouts/app-footer/app-footer.component';
import { HomeComponent } from './home/home.component';
import { QuoteComponent } from './site/quote/quote.component';
import { ListComponent } from './shipments/list/list.component';
import { AppAsideComponent } from './layouts/app-aside/app-aside.component';
import { AppContainerComponent } from './layouts/app-container/app-container.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewShipmentComponent } from './shipments/new-shipment/new-shipment.component';
import { NewPackageComponent } from './packages/new-package/new-package.component';
import { ListPackagesComponent } from './packages/list-packages/list-packages.component';
import { EditPackageComponent } from './packages/edit-package/edit-package.component';

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
    EditPackageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
