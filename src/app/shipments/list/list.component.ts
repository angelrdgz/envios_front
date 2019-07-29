import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public shipments;

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
}
