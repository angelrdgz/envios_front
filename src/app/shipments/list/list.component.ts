import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public shipments:any = [];

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.getShipments();
    console.log(this.shipments)    
  }

  getShipments(){
    this._apiService.getShipments().subscribe(
      data => { this.shipments = data.data},
      err => console.error(err),
      () => console.log(this.shipments)
    );
  }

  cancelShipment(id){
    Swal.fire({
      title: '¿Desea cancelar?',
      text: 'Usted no recuperara información de esta guía',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._apiService.cancelShipment(id).subscribe(
          data => { 
            console.log(data)
            if(data.data.meta == 'error'){
              Swal.fire(
                'Error',
                data.data.error.message,
                'error'
              )
            }else{
              Swal.fire(
                'Éxito',
                'Su guía ha sido cancelada correctamente.',
                'success'
              )

            }
          },
          err => console.error(err),
          () => ""
        );
        
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      }
    })
  }
}
