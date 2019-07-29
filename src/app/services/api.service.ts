import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  login(data){
    return this.http.post('http://localhost:8000/api/auth/login', data);
  }

  register(data){
    return this.http.post('http://localhost:8000/api/auth/register', data);
  }

  getShipments() {
    return this.http.get('http://localhost:8000/api/shipments');
  }

  getPackages() {
    return this.http.get('http://localhost:8000/api/packages');
  }

  getPackage(id) {
    return this.http.get('http://localhost:8000/api/packages/'+id);
  }

  savePackage(data){
    return this.http.post('http://localhost:8000/api/packages', data);
  }

  updatePackage(id, data){
    return this.http.put('http://localhost:8000/api/packages/'+id, data);
  }
}
