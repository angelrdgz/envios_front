import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  invoices:any;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices(){

    this._apiService.getInvoices().subscribe(
      data => { console.log(data); this.invoices = data.data },
      err => {
        console.log(err)
      },
      () => {

      }

    );

  }

}
