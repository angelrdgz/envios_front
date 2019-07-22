import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppBodyComponent } from './layouts/app-body/app-body.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  //Site routes goes here 
  { 
    path: '', 
    component: AppBodyComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full'},
    ]
},

//no layout routes
{ path: 'login', component: LoginComponent},
// otherwise redirect to home
{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
