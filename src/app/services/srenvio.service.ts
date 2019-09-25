import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
//import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders(
    { 
      'Content-Type': 'application/json'
    }
    )
};

@Injectable({
  providedIn: 'root'
})
export class SrenvioService {

  constructor(private http:HttpClient) { }
}

