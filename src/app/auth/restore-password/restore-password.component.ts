import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

  public user:any = {hash:'',password:'', password_confirm:''};
  public loginErrors:any = {password:'', password_confirm:''};
  public active:boolean = false;
  public error:boolean = false;
  data:any;
  public loading:boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user.hash = this.route.snapshot.paramMap.get("hash")
  }

  sendNewPassword(form){
    console.log(form.value)
    this.loading = true;
    this._apiService.newPassword(form.value).subscribe(
      data => { this.data = data },
      err => {
      
        switch(err.status) { 
          case 401: { 
            
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
             break; 
          } 
       } 
        console.log(err)
        this.loading = false;
      },
      () => {
        this.loading = false;
        localStorage.setItem('user_ses', JSON.stringify(this.data.user))
        localStorage.setItem('token_user', this.data.api_key)
        this.router.navigate(['admin/dashboard'])
      }
    );
  }

}
