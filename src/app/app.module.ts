import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SiteHeaderComponent } from './layouts/site-header/site-header.component';
import { SiteBodyComponent } from './layouts/site-body/site-body.component';
import { SiteFooterComponent } from './layouts/site-footer/site-footer.component';
import { AppHeaderComponent } from './layouts/app-header/app-header.component';
import { AppBodyComponent } from './layouts/app-body/app-body.component';
import { AppFooterComponent } from './layouts/app-footer/app-footer.component';
import { HomeComponent } from './home/home.component';

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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
