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

  getShipments() {
    return this.http.get('http://localhost:8000/api/shipments');
  }
}
