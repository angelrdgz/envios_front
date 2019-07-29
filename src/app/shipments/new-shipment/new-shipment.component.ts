import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-shipment',
  templateUrl: './new-shipment.component.html',
  styleUrls: ['./new-shipment.component.scss']
})
export class NewShipmentComponent implements OnInit {

  public shipment = {
    "address_from": {
    "province": "Jalisco",
    "city": "Guadalajara",
    "name": "Jose Fernando",
    "zip": "02900",
    "country": "MXN",
    "address1": "Av. Principal #234",
    "company": "srenvio",
    "address2": "Centro",
    "phone": "3384217447",
    "email": "srenvio@email.com"},
    "parcels": [{
      "weight": 3,
      "distance_unit": "CM",
      "mass_unit": "KG",
      "height": 10,
      "width": 10,
      "length": 10
    }],
    "address_to": {
      "province": "Jalisco",
      "city": "Guadalajara",
      "name": "Jorge Fernández",
      "zip": "23312",
      "country": "MXN",
      "address1": " Av. Lázaro Cárdenas #234",
      "company": "-",
      "address2": "Americana",
      "phone": "3311510605",
      "email": "ejemplo@srenvio.com",
      "contents": ""
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
