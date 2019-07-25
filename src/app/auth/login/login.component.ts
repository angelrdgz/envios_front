import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = {email:"",password:""};
  public userIndividual = {name:"", lastname:"", email:"", type_id:"1", phone:"", business:0, password:"",confirm:"", terms:true};
  public userBusiness = {name:"", lastname:"", company:"", email:"", type_id:"1", phone:"", business:1, shipments:"2", password:"",confirm:"", terms:true};
  public data:any;

  constructor(private _apiService: ApiService) {
  }

  ngOnInit() {
    console.log(localStorage.getItem('user_ses'));
  }

  login(){
    this._apiService.login(this.user).subscribe(
      data => { this.data = data},
      err => console.error(err),
      () => localStorage.setItem('user_ses', JSON.stringify(this.data))
    );
  }

  register(type){
    if(type == 0){
      this._apiService.register(this.userIndividual).subscribe(
        data => {  console.log(data) },
        err => console.error(err),
        () => {}
      );

    }else{
      this._apiService.register(this.userBusiness).subscribe(
        data => { console.log(data) },
        err => console.error(err),
        () => {}
      );

    }

  }

}
