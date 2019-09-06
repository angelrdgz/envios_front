import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'

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
  public loading:boolean = false;

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
    this.loginErrors = {email:''};
    this.loading = true;

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
        this.loading = false;
      },
      () => {
        //console.log(this.data)
        this.loading = false;
        this.showSwal('success', 'Te hemos enviado un correo a tu cuenta');
      }
    );
  }

  showSwal(type, message) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 5000,
      background: '#000'
    })
    
    Toast.fire({
      type: type,
      title: message,
      
    })
  }

}
