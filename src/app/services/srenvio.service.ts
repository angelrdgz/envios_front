import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
//import { Observable } from 'rxjs/Observable';

const srEnvioEndpoint = environment.srEnvioEndpoint;
const srEnviToken = environment.srEnvioToken;

const httpOptions = {
  headers: new HttpHeaders(
    { 
      'Content-Type': 'application/json', 
      'Authorization':  srEnviToken,
      'Access-Control-Allow-Origin': '*'
    }
    )
};

@Injectable({
  providedIn: 'root'
})
export class SrenvioService {

  constructor(private http:HttpClient) { }

  quote(data){
    return this.http.post(srEnvioEndpoint+'/quotations', data, httpOptions);
  }
}

