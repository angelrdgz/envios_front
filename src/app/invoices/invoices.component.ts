import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  public invoices:any = [];
  public months:any = [];
  public currentMonth:string = "01";
  public monthNames:any = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    
    var d = new Date();
    var n = d.getMonth()//("0" + (d.getMonth() + 1)).slice(-2);
    for (let index = 0; index <= n; index++) {
      this.months.push({id: ("0" + (index + 1)).slice(-2), name:this.monthNames[(index+1)]+" "+d.getFullYear()})      
    }

    this.currentMonth = ("0" + (d.getMonth() + 1)).slice(-2);

    console.log(this.months)

    this.getInvoices(n+1);
  }

  downloadInvoice(id, type){

    console.log(type)

    this._apiService.downloadInvoice(id, type).subscribe(
      data => { console.log(data); },
      err => {
        console.log(err)
      },
      () => {

      }

    );

  }

  getInvoices(month){

    this._apiService.getInvoices(parseInt(month)).subscribe(
      data => { console.log(data); this.invoices = data.data },
      err => {
        console.log(err)
      },
      () => {

      }

    );

  }

  createInvoice(id){
    this._apiService.cancelInvoice(id).subscribe(
      data => { 
        console.log(data);
        if(data.status == 'fail'){
          this.showSwalToast('error', data.message)
        }
       },
      err => {        
        console.log(err.message)
      },
      () => {

      }

    );
  }

  cancelInvoice(id){
    this._apiService.cancelInvoice(id).subscribe(
      data => { 
        console.log(data);
        if(data.status == 'fail'){
          this.showSwalToast('error', data.message)
        }
       },
      err => {        
        console.log(err.message)
      },
      () => {

      }

    );
  }

  showSwalToast(type, message) {
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
