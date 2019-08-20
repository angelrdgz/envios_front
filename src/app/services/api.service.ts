import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface Res {
  status: string;
  data:any;
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
    return this.http.post<Res>('http://localhost:8000/api/srenvio/quote', data, httpOptions);
  }

  login(data):Observable<Res>{
    return this.http.post<Res>('http://localhost:8000/api/auth/login', data);
  }

  logout(){
    return this.http.get<Res>('http://localhost:8000/api/auth/logout');
  }

  register(data):Observable<Res>{
    return this.http.post<Res>('http://localhost:8000/api/auth/register', data);
  }

  
  activeAccount(hash):Observable<User>{
    return this.http.get<User>('http://localhost:8000/api/auth/active-account/'+hash);
  }

  getShipments() {
    return this.http.get<Res>('http://localhost:8000/api/shipments');
  }

  createShipment(data){
    return this.http.post<Res>('http://localhost:8000/api/shipments', data);
  }

  getPackages() {
    return this.http.get<Res>('http://localhost:8000/api/packages');
  }

  getPackage(id) {
    return this.http.get<Res>('http://localhost:8000/api/packages/'+id);
  }

  savePackage(data){
    return this.http.post<Res>('http://localhost:8000/api/packages', data);
  }

  updatePackage(id, data){
    return this.http.put<Res>('http://localhost:8000/api/packages/'+id, data);
  }

  deletePackage(id){
    return this.http.delete<Res>('http://localhost:8000/api/packages/'+id);
  }

  getOrigenes(){
    return this.http.get<Res>('http://localhost:8000/api/locations/get-origenes');
  }
  
  getDestinations(){
    return this.http.get<Res>('http://localhost:8000/api/locations/get-destinations');
  }

  getLocation(id){
    return this.http.get<Res>('http://localhost:8000/api/locations/'+id);
  }

  getCountries(){
    return this.http.get<Res>('http://localhost:8000/api/countries');
  }
}
