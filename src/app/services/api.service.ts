import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';

const ApiEndpoint = environment.APIEndpoint;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface Res {
  status: string;
  data:any;
}

interface Shipment {
  rates: string;
  shipment_id:number;
}

interface User {
  api_key:any;
  user:any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  quote(data){
    return this.http.post<Res>(ApiEndpoint+'/srenvio/quote', data, httpOptions);
  }

  login(data):Observable<User>{
    return this.http.post<User>(ApiEndpoint+'/auth/login', data);
  }

  logout(){
    return this.http.get<Res>(ApiEndpoint+'/auth/logout');
  }

  register(data):Observable<Res>{
    return this.http.post<Res>(ApiEndpoint+'/auth/register', data);
  }

  forgotPassword(data):Observable<Res>{
    return this.http.post<Res>(ApiEndpoint+'/auth/forgot-password', data);
  }
  
  newPassword(data):Observable<Res>{
    return this.http.post<Res>(ApiEndpoint+'/auth/restore-password', data);
  }
  
  activeAccount(hash):Observable<User>{
    return this.http.get<User>(ApiEndpoint+'/auth/active-account/'+hash);
  }

  getDashboard(){
    return this.http.get<Res>(ApiEndpoint+'/dashboard ');
  }

  getShipments() {
    return this.http.get<Res>(ApiEndpoint+'/shipments');
  }

  getNeights(data){
    return this.http.post<Res>(ApiEndpoint+'/ezcmd/get-locations', data);
  }

  createShipment(data){
    return this.http.post<Shipment>(ApiEndpoint+'/shipments', data);
  }

  createLabel(data){
    return this.http.post<Shipment>(ApiEndpoint+'/shipments/create-label', data);
  }

  cancelShipment(id){
    return this.http.delete<Shipment>(ApiEndpoint+'/shipments/'+id);
  }

  getRecharges(){
    return this.http.get<Res>(ApiEndpoint+'/recharges');
  }

  makePayment(data){
    return this.http.post<Res>(ApiEndpoint+'/recharges', data);
  }

  getInvoices(){
    return this.http.get<Res>(ApiEndpoint+'/invoices');
  }

  getPackages() {
    return this.http.get<Res>(ApiEndpoint+'/packages');
  }

  getPackage(id) {
    return this.http.get<Res>(ApiEndpoint+'/packages/'+id);
  }

  savePackage(data){
    return this.http.post<Res>(ApiEndpoint+'/packages', data);
  }

  updatePackage(id, data){
    return this.http.put<Res>(ApiEndpoint+'/packages/'+id, data);
  }

  deletePackage(id){
    return this.http.delete<Res>(ApiEndpoint+'/packages/'+id);
  }

  getOrigenes(){
    return this.http.get<Res>(ApiEndpoint+'/locations/origenes');
  }
  
  getDestinations(){
    return this.http.get<Res>(ApiEndpoint+'/locations/destinations');
  }

  getLocation(id){
    return this.http.get<Res>(ApiEndpoint+'/locations/'+id);
  }

  getCountries(){
    return this.http.get<Res>(ApiEndpoint+'/countries');
  }
}
