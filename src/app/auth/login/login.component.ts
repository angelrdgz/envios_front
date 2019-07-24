import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = {email:"",password:""};
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

}
