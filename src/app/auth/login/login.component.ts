import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = {email:"angelrodriguez@ucol.mx", password:"suiton.1"};
  public data:any;
  public loginErrors:any;
  public loginError:string = ''

  constructor(
    private _apiService: ApiService,
    private router: Router
    ) {
  }

  ngOnInit() {
    if(localStorage.getItem('token_user') !== null){
      this.router.navigate(['admin/dashboard'])
    }
  }

  func(e){
    console.log(e)
  }

  login(){
    console.log(this.user)
    this._apiService.login(this.user).subscribe(
      data => { this.data = data},
      err => {
        switch(err.status) { 
          case 401: { 
            this.loginError = 'Email o contraseña incorrectos'
            break; 
         } 
          case 422: { 
             this.loginErrors = err.error.errors
             break; 
          } 
          case 500: { 
             //statements; 
             break; 
          } 
          default: { 
            this.loginError = ''
             break; 
          } 
       } 
       console.log(this.loginErrors)
      },
      () => {
        console.log(this.data)
        localStorage.setItem('user_ses', JSON.stringify(this.data.user))
        localStorage.setItem('token_user', this.data.api_key)
        this.router.navigate(['admin/shipments'])
      }
    );
  }

  public saveEmail(email: string): void {
    // ... save user email
  }

  showSwal(){
  }

}
