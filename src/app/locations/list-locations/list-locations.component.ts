import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-locations',
  templateUrl: './list-locations.component.html',
  styleUrls: ['./list-locations.component.scss']
})
export class ListLocationsComponent implements OnInit {

  public locations:any;

  constructor(
    private _apiService: ApiService,
  ) { }

  ngOnInit() {
    this.getLocationsOrigin()
  }

  getLocations(val){
    if(val == 1){
      this.getLocationsOrigin()
    }else{
      this.getLocationsDestination()
    }
  }

  deleteLocation(id) {

    Swal.fire({
      title: 'Eliminar Domicilio',
      text: "¿Estas seguro de eliminar el registro?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._apiService.deleteLocation(id).subscribe(
          data => { 
            this.locations = data.data 
          },
          err => console.error(err),
          () => {
          }
        );
      }
    })

  }

  

  getLocationsOrigin() {

    this._apiService.getOrigenes().subscribe(
      data => { 
        this.locations = data.data 
      },
      err => console.error(err),
      () => {
      }
    );

  }

  getLocationsDestination() {
    this._apiService.getDestinations().subscribe(
      data => { this.locations = data.data },
      err => console.error(err),
      () => {
      }
    );
  }

}
