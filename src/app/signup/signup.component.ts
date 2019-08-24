import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
    loading = false;
    submitted = false;
    business=0;

    public user = {name:'',email:'',password:'',password_confirm:'',phone:'',company:'',business:0, shipments:0}
    public loginErrors:any;

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

    onSubmit(){

    }

    register(){
      console.log(this.user)
    this._apiService.register(this.user).subscribe(
      data => { this.router.navigate(['admin/shipments']) },
      err => {
        switch(err.status) { 
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
       console.log(err)
      },
      () => {
        
      }
    );
    }

}
