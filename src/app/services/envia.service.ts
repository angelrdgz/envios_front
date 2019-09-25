import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
//import { Observable } from 'rxjs/Observable';

const enviaEndpoint = environment.enviaEndpoint;
const enviaToken = environment.enviaToken;

const httpOptions = {
  headers: new HttpHeaders(
    { 
      'Content-Type': 'application/json', 
      'Authorization':  'Bearer '+enviaToken
    }
    )
};

interface Res {
  meta: string;
  data:any;
}

@Injectable({
  providedIn: 'root'
})
export class EnviaService {

  constructor(private http:HttpClient) { }

  quote(data){
    return this.http.post<Res>(enviaEndpoint+'/ship/rate', data, httpOptions);
  }
}

