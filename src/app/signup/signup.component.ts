import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  business = 0;
  public loading: boolean = false;

  public user = { name: '', email: '', password: '', password_confirmation: '', phone: '', company: '', business: 0, shipments: 0, terms: true }
  public loginErrors: any = { name: null, email: null, password: null, password_confirm: null, phone: null, company: null, shipments: null };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _apiService: ApiService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onSubmit() {

  }

  register() {
    this.loginErrors = { name: null, email: null, password: null, password_confirm: null, phone: null, company: null, shipments: null };
    this.loading = true;
    this._apiService.register(this.user).subscribe(
      data => {
        Swal.fire({
          title: 'Registro Exitoso',
          text: 'Hemos enviado un correo de confirmación a tu cuenta',
          type: 'success',
        })
        //this.router.navigate(['admin/shipments']) 
      },
      err => {
        console.log(err)
        switch (err.status) {
          case 401: {
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
          }
        }
        this.loading = false;
      },
      () => {
        this.loading = false;

      }
    );
  }

}
