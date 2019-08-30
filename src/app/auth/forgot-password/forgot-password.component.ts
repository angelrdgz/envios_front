import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  loginForm: FormGroup;
  loginError:string;
  loginErrors:any = {email:''};
  data:any;

  constructor(
    private _apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    if (localStorage.getItem('token_user') !== null) {
      this.router.navigate(['admin/dashboard'])
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  sendRequest(form) {

    console.log(form.value)
    this.loginErrors = {email:'', password:''};

    this._apiService.forgotPassword(form.value).subscribe(
      data => { console.log(data) },
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
        console.log(err)
      },
      () => {
        //console.log(this.data)
      }
    );
  }

}
