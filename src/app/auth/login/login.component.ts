import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user:any = {email:"angel@envios.com",password:"Hola1@"};
  public userIndividual = {name:"", lastname:"", email:"", type_id:"1", phone:"", business:0, password:"",confirm:"", terms:true};
  public userBusiness = {name:"", lastname:"", company:"", email:"", type_id:"1", phone:"", business:1, shipments:"1", password:"",confirm:"", terms:true};
  public data:any;
  public loginErrors:any;
  public individualErrors:any;
  public businessErrors:any;
  public loginError:string = ''

  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
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

  register(type){
    if(type == 1){
      this._apiService.register(this.userIndividual).subscribe(
        data => { },
        err => {
          switch(err.status) { 
            case 401: { 
              this.loginError = 'Email o contraseña incorrectos'
              break; 
           } 
            case 422: { 
               this.individualErrors = err.error.errors
               break; 
            } 
            case 500: { 
               //statements; 
               break; 
            } 
            default: { 
              
            break; 
            } 
         }
        },
        () => {}
      );

    }else{
      this._apiService.register(this.userBusiness).subscribe(
        data => { console.log(data) },
        err => {
          switch(err.status) { 
            case 401: { 
              break; 
           } 
            case 422: { 
               this.businessErrors = err.error.errors
               break; 
            } 
            case 500: { 
               //statements; 
               break; 
            } 
            default: { 
              
            break; 
            } 
         }
        },
        () => {}
      );

    }

  }

  public saveEmail(email: string): void {
    // ... save user email
  }

  showSwal(){
  }

}
