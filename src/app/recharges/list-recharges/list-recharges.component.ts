import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

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
