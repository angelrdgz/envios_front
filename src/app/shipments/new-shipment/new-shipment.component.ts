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
  public package:any = {weight:0, height:0, width:0, length:0}
  public origenes:any;
  public destinations:any;
  public rates:any
  public countries:any

  public quote =
    {
      "zip_from": "",
      "zip_to": "",
      "parcel": {
        "weight": 0,
        "height": 0,
        "width": 0,
        "length": 0
      }
    };

  public extraInfo = {
    origen:{
      active: false,
      nickname:""
    },
    destination:{
      active: false,
      nickname:""
    }
  }


  public shipment = {
    "address_from": {
    "province":"",
    "city": "",
    "name": "",
    "zip": "",
    "country": "MX",
    "address1": "",
    "company": "",
    "address2": "",
    "phone": "",
    "email": "",
    "reference":""
    },    
    "parcels": [{
      "weight": this.package.weight,
      "distance_unit": "CM",
      "mass_unit": "KG",
      "height": this.package.height,
      "width": this.package.width,
      "length": this.package.length
    }],
    "address_to": {
      "province": "",
      "city": "",
      "name": "",
      "zip": "",
      "country": "US",
      "address1": "",
      "company": "",
      "address2": "",
      "phone": "",
      "email": "",
      "reference":"",
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
    this.getCountries()
  }

  onChange(deviceValue) {
    if(deviceValue != ''){
      this.getPackage(deviceValue)
    }else{
      this.shipment.parcels[0].weight = 0
        this.shipment.parcels[0].height = 0
        this.shipment.parcels[0].width = 0
        this.shipment.parcels[0].length = 0
    }
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

  getQuote() {
    this.rates = []
    this.quote.zip_from = this.shipment.address_from.zip
    this.quote.zip_to = this.shipment.address_to.zip
    this._apiService.quote(this.quote).subscribe(
      data => { this.rates = data.data },
      err => console.error(err),
      () => console.log(this.rates)
    );
  }

  getPackages(){
    this._apiService.getPackages().subscribe(
      data => { this.packages = data.data},
      err => console.error(err),
      () => ''
    );
  }
  getCountries(){
    this._apiService.getCountries().subscribe(
      data => { this.countries = data.data},
      err => console.error(err),
      () => ''
    );
  }

  getPackage(id){
    this._apiService.getPackage(id).subscribe(
      data => { 
        this.shipment.parcels[0].weight = data.data.weight
        this.shipment.parcels[0].height = data.data.height
        this.shipment.parcels[0].width = data.data.width
        this.shipment.parcels[0].length = data.data.length
        this.quote.parcel.height =  parseInt(data.data.height)
        this.quote.parcel.width =  parseInt(data.data.width)
        this.quote.parcel.length =  parseInt(data.data.length)
        this.quote.parcel.weight =  parseInt(data.data.weight)
      },
      err => console.error(err),
      () => console.log(this.package)
    );
  }

  getOrigen(id){
    this._apiService.getLocation(id).subscribe(
      data => { 
        this.shipment.address_from.province = data.data.state 
        this.shipment.address_from.city = data.data.city 
        this.shipment.address_from.name = data.data.nickname 
        this.shipment.address_from.zip = data.data.zipcode 
        this.shipment.address_from.country = data.data.country 
        this.shipment.address_from.address1 = data.data.address 
        this.shipment.address_from.company = "" 
        this.shipment.address_from.address2 = data.data.address2 
        this.shipment.address_from.phone = data.data.phone 
        this.shipment.address_from.email = data.data.email 
        this.shipment.address_from.reference = data.data.reference
      },
      err => console.error(err),
      () => console.log(this.package)
    );
  }

  getDestination(id){
    this._apiService.getLocation(id).subscribe(
      data => { 
        this.shipment.address_to.province = data.data.state 
        this.shipment.address_to.city = data.data.city 
        this.shipment.address_to.name = data.data.nickname 
        this.shipment.address_to.zip = data.data.zipcode 
        this.shipment.address_to.country = data.data.country 
        this.shipment.address_to.address1 = data.data.address 
        this.shipment.address_to.company = "" 
        this.shipment.address_to.address2 = data.data.address2 
        this.shipment.address_to.phone = data.data.phone 
        this.shipment.address_to.email = data.data.email 
        this.shipment.address_to.reference = data.data.reference
      },
      err => console.error(err),
      () => console.log(this.package)
    );
  }

}
