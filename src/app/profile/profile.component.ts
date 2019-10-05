import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: any = {name:'',email:'',phone:'',password:'', password_confirmation:''};
  public cUser:any;
  public loginErrors: any = { name: '', password: '' };

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.cUser = JSON.parse(localStorage.getItem('user_ses'));
    this.user.name = this.cUser.name
    this.user.email = this.cUser.email
    this.user.phone = this.cUser.phone
  }

  updateProfile() {

    this._apiService.updateProfile(this.user).subscribe(
      data => {
        Swal.fire({
          title: 'Perfil Actualizado',
          text: 'Su perfil se ha actualizado con éxito.',
          type: 'success',
        })
        localStorage.setItem('user_ses', JSON.stringify(data.data))
      },
      err => {
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
      },
      () => {


      }
    );

  }

}
