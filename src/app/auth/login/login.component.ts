import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError:string;
  loginErrors:any = {email:'', password:''};
  data:any;

  constructor(
    private _apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
  }

  get f() { return this.loginForm.controls; }

  ngOnInit() {

    if (localStorage.getItem('token_user') !== null) {
      this.router.navigate(['admin/dashboard'])
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }


  login(form) {

    console.log(form.value)
    this.loginErrors = {email:'', password:''};

    this._apiService.login(form.value).subscribe(
      data => { this.data = data },
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
        localStorage.setItem('user_ses', JSON.stringify(this.data.user))
        localStorage.setItem('token_user', this.data.api_key)
        this.router.navigate(['admin/dashboard'])
      }
    );
  }

  public saveEmail(email: string): void {
    // ... save user email
  }

  showSwal() {
  }

}
