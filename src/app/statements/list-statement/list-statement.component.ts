import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-statement',
  templateUrl: './list-statement.component.html',
  styleUrls: ['./list-statement.component.scss']
})
export class ListStatementComponent implements OnInit {

  public logbooks:any = [];
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

    this.getLogbook(n+1);
  }

  getLogbook(month){

    this._apiService.getLogbook(parseInt(month)).subscribe(
      data => { console.log(data); this.logbooks = data.data },
      err => {
        console.log(err)
      },
      () => {

      }

    );

  }

}
