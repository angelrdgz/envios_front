import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ApiService } from './services/api.service';
import { EnviaService } from './services/envia.service';
import { ToastService } from './services/toast.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { LoaderInterceptor } from './_helpers/loader.interceptor';
import { LoaderService } from './services/loader.service';

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
import { NewRechargeComponent } from './recharges/new-recharge/new-recharge.component';
import { ListCardsComponent } from './cards/list-cards/list-cards.component';
import { NewCardComponent } from './cards/new-card/new-card.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ActiveAccountComponent } from './auth/active-account/active-account.component';
import { RegisterComponent } from './auth/register/register.component';

import {DataTableModule} from "angular-6-datatable";
import { HighchartsChartModule } from 'highcharts-angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { SignupComponent } from './signup/signup.component';
import { ServicesComponent } from './site/services/services.component';
import { TrackingComponent } from './site/tracking/tracking.component';
import { ContactComponent } from './site/contact/contact.component';
import { RestorePasswordComponent } from './auth/restore-password/restore-password.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ToastsContainer } from './toast-container/toast-container.component';
import { DetailShipmentComponent } from './shipments/detail-shipment/detail-shipment.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPoliticsComponent } from './privacy-politics/privacy-politics.component';
import { AppLoaderComponent } from './layouts/app-loader/app-loader.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SiteHeaderComponent,
    SiteBodyComponent,
    SiteFooterComponent,
    AppHeaderComponent,
    AppBodyComponent,
    AppLoaderComponent,
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
    ListRechargesComponent,
    NewRechargeComponent,
    ListCardsComponent,
    NewCardComponent,
    ForgotPasswordComponent,
    ActiveAccountComponent,
    RegisterComponent,
    SignupComponent,
    ServicesComponent,
    TrackingComponent,
    ContactComponent,
    RestorePasswordComponent,
    SettingsComponent,
    ProfileComponent,
    InvoicesComponent,
    ToastsContainer,
    DetailShipmentComponent,
    TermsAndConditionsComponent,
    PrivacyPoliticsComponent,
    AppLoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    BrowserAnimationsModule,
    DataTableModule,
    HighchartsChartModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    ApiService,
    EnviaService,
    ToastService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
