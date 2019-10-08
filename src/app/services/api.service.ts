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

interface Invoice{
  status: string;
  data:any;
  message:any;
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
    return this.http.post<Res>(ApiEndpoint+'/rates', data, httpOptions);
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

  resendEmail(data):Observable<Res>{
    return this.http.post<Res>(ApiEndpoint+'/auth/resend-email', data);
  }

  contact(data):Observable<Res>{
    return this.http.post<Res>(ApiEndpoint+'/auth/contact', data);
  }
  
  newPassword(data):Observable<Res>{
    return this.http.post<Res>(ApiEndpoint+'/auth/restore-password', data);
  }
  
  activeAccount(hash):Observable<User>{
    return this.http.get<User>(ApiEndpoint+'/auth/active-account/'+hash);
  }

  updateProfile(data):Observable<Res>{
    return this.http.put<Res>(ApiEndpoint+'/profile', data);
  }

  getDashboard(month){
    return this.http.get<Res>(ApiEndpoint+'/dashboard?month='+month);
  }  

  businessInfo(data):Observable<Res>{
    return this.http.post<Res>(ApiEndpoint+'/auth/business-info', data);
  }

  getConfiguration():Observable<Res>{
    return this.http.get<Res>(ApiEndpoint+'/configurations');
  }

  updateConfiguration(data):Observable<Res>{
    return this.http.put<Res>(ApiEndpoint+'/configurations', data);
  }

  getBusinessInfo():Observable<Res>{
    return this.http.get<Res>(ApiEndpoint+'/auth/business-info');
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
    return this.http.post<Res>(ApiEndpoint+'/shipments/create-label', data);
  }

  cancelShipment(id){
    return this.http.delete<Res>(ApiEndpoint+'/shipments/'+id);
  }

  getShipment(id){
    return this.http.get<Res>(ApiEndpoint+'/shipments/'+id);
  }

  shipmentTracking(id){
    return this.http.get<Res>(ApiEndpoint+'/tracking/'+id);
  }

  getRecharges(){
    return this.http.get<Res>(ApiEndpoint+'/recharges');
  }

  makePayment(data){
    return this.http.post<Res>(ApiEndpoint+'/recharges', data);
  }

  createInvoice(id){
    return this.http.post<Res>(ApiEndpoint+'/recharges/'+id+'/invoice', {});
  }

  getInvoices(month){
    return this.http.get<Res>(ApiEndpoint+'/invoices?month='+month);
  }

  downloadInvoice(id, type){
    return this.http.get<Res>(ApiEndpoint+'/invoices/'+id+'?type='+type);
  }

  cancelInvoice(id){
    return this.http.delete<Invoice>(ApiEndpoint+'/invoices/'+id);
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

  getStates(code){
    return this.http.get<Res>(ApiEndpoint+'/states?country_code='+code);
  }

  getCarriers(code){
    return this.http.get<Res>(ApiEndpoint+'/carriers?country_code='+code);
  }
}
