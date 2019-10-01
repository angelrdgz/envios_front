import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public business:any = {
    name:'',
    lastname:'',
    email:'',
    phone:'',
    address:'',
    business_name:'',
    rfc:'',
    num_int:'',
    num_ext:0,
    zip_code:'',
    neight:'',
    city:'',
    state:'',
  }

  constructor(
    private _apiService: ApiService
  ) { }

  ngOnInit() {
    this.getBusinessInfo();
  }

  getBusinessInfo(){
    this._apiService.getBusinessInfo().subscribe(
      data => { 
        this.business.name = data.data.name
        this.business.lastname = data.data.lastname
        this.business.email = data.data.email
        this.business.phone = data.data.phone
        this.business.business_name = data.data.business_name
        this.business.rfc = data.data.rfc
        this.business.zip_code = data.data.zip_code
        this.business.address = data.data.address
        this.business.num_ext = data.data.num_ext
        this.business.num_int = data.data.num_int
        this.business.state = data.data.state
        this.business.neight = data.data.neight
        this.business.city = data.data.city
        console.log(data)
      },
      err => console.error(err),
      () => console.log('Hola')
    );
  }

  updateBusinessInfo(){
    this._apiService.businessInfo(this.business).subscribe(
      data => { console.log(data)},
      err => console.error(err),
      () => console.log('Hola')
    );
  }

}
