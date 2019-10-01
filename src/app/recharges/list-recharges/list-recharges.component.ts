import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { timeout } from 'q';
import Swal from 'sweetalert2'


declare var $: any;

@Component({
  selector: 'app-list-recharges',
  templateUrl: './list-recharges.component.html',
  styleUrls: ['./list-recharges.component.scss']
})
export class ListRechargesComponent implements OnInit {
  payments:any;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.getRecharges();    
  }

  createInvoice(id){

    this._apiService.createInvoice(id).subscribe(
      data => {
        console.log(data)

          Swal.fire({
            title: 'Factura Generada',
            text: 'Puedes descargar tus formatos en la sección de facturas',
            type: 'success',
          })
        
      },
      err => {
        Swal.fire({
          title: 'Error',
          text: err.error.data.message,
          type: 'error',
        })
        console.log('error', err)
      },
      () => {
        
      }

    );

  }

  getRecharges(){

    this._apiService.getRecharges().subscribe(
      data => { console.log(data); this.payments = data.data },
      err => {
        console.log(err)
      },
      () => {
        
      }

    );

  }

}
