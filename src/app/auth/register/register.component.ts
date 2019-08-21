import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public business:string = 'Male';
  title = 'Hola';
  user:any = {name:"", lastname:"", company:"", email:"", type_id:"1", phone:"", business:0, shipments:"1", password:"",confirm:"", terms:true};

  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

}
