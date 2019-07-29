import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SrenvioService } from './../../services/srenvio.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'new-shipment',
  templateUrl: './new-shipment.component.html',
  styleUrls: ['./new-shipment.component.scss'],
  animations: [

    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),
        
          query(':leave', stagger('300ms', [
            animate('1s ease-in', keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
              style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
            ]))]), {optional: true})
      ])
    ])

  ]
})
export class NewShipmentComponent implements OnInit {

  public packages:any;
  public origenes:any;
  public destinations:any;
  public rates:any

  public quote =
    {
      "zip_from": "91000",
      "zip_to": "64000",
      "parcel": {
        "weight": 10,
        "height": 52,
        "width": 10,
        "length": 10
      }
    };

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

  constructor(
    private _apiService: ApiService,
    private _srEnvioService: SrenvioService
    ) { }

  ngOnInit() {
    this.getLocationsOrigin()
    this.getLocationsDestination()
    this.getPackages()
  }

  getQuote(){
    this._srEnvioService.quote(this.quote).subscribe(
      data => { this.rates = data },
      err => console.error(err),
      () => console.log(this.rates)
    );
  }

  getLocationsOrigin(){

    this._apiService.getOrigenes ().subscribe(
      data => { this.origenes = data.data},
      err => console.error(err),
      () => console.log(this.origenes)
    );

  }

  getLocationsDestination(){

    this._apiService.getDestinations().subscribe(
      data => { this.destinations = data.data},
      err => console.error(err),
      () => ''
    );

  }

  getPackages(){
    this._apiService.getPackages().subscribe(
      data => { this.packages = data.data},
      err => console.error(err),
      () => ''
    );
  }

}
