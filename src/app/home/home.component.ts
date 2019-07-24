import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public shipments;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.getShipments();
    console.log(this.shipments)
  }

  getShipments(){
    this._apiService.getShipments().subscribe(
      data => { this.shipments = data},
      err => console.error(err),
      () => console.log(this.shipments)
    );

  }

}
