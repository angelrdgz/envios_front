import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import swal from 'sweetalert';

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

  login(){
    this._apiService.login(this.user).subscribe(
      data => { this.data = data},
      err => console.error(err),
      () => {
        console.log(this.data)
        localStorage.setItem('user_ses', JSON.stringify(this.data.user))
        localStorage.setItem('token_user', this.data.api_key)
        this.router.navigate(['admin/shipments'])
      }
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

  public saveEmail(email: string): void {
    // ... save user email
  }

  showSwal(){
  }

}
