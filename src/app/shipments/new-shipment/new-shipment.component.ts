import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SrenvioService } from './../../services/srenvio.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2'

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
  public index:number = -1
  public label:any = {rate_id: 0, label_format: "pdf", shipment_id: 0, price: 0, carrier:"" };
  public shipment:any = {
    address_from: {
      province: "",
      city: "",
      name: "",
      zip: "",
      country: "",
      address1: "",
      company: "",
      address2: "",
      phone: "",
      email: ""},
      reference: "",
      parcels: [{
        weight: 0,
        distance_unit: "CM",
        mass_unit: "KG",
        height: 0,
        width: 0,
        length: 0
      }],
      address_to: {
        province: "",
        city: "",
        name: "",
        zip: "",
        country: "",
        address1: "",
        company: "",
        address2: "",
        phone: "",
        email: "",
        references: "",
        contents: ""
      }

  }

  public extraInfo = {
    origen:{
      id:null,
      active: false,
      nickname:""
    },
    destination:{
      id:null,
      active: false,
      nickname:""
    }
  }

  constructor(
    private _apiService: ApiService,
    private _srEnvioService: SrenvioService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.getLocationsOrigin()
    this.getLocationsDestination()
    this.getPackages()
    this.getCountries()

    console.log(this.shipment)
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
      () => {
        if(this.origenes.length == 0){
          this.extraInfo.origen.active = true
        }
      }
    );

  }

  getLocationsDestination(){
    this._apiService.getDestinations().subscribe(
      data => { this.destinations = data.data},
      err => console.error(err),
      () => {
        if(this.destinations.length == 0){
          this.extraInfo.destination.active = true
        }
      }
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
        this.shipment.parcels[0].weight = parseInt(data.data.weight)
        this.shipment.parcels[0].height = parseInt(data.data.height)
        this.shipment.parcels[0].width = parseInt(data.data.width)
        this.shipment.parcels[0].length = parseInt(data.data.length)
        this.shipment.address_to.contents = data.data.contents
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
        this.shipment.address_from.company = data.data.company
        this.shipment.address_from.address2 = data.data.address2 
        this.shipment.address_from.phone = data.data.phone 
        this.shipment.address_from.email = data.data.email 
        this.shipment.address_from.reference = data.data.reference
        this.extraInfo.origen.id = data.data.id
        this.extraInfo.origen.nickname = data.data.nickname
      },
      err => console.error(err),
      () => console.log(this.extraInfo)
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
        this.shipment.address_to.company = data.data.company 
        this.shipment.address_to.address2 = data.data.address2 
        this.shipment.address_to.phone = data.data.phone 
        this.shipment.address_to.email = data.data.email 
        this.shipment.address_to.reference = data.data.reference
        this.extraInfo.destination.id = data.data.id
        this.extraInfo.destination.nickname = data.data.nickname
      },
      err => console.error(err),
      () => console.log(this.extraInfo)
    );
  }

  createShipment(){
    this._apiService.createShipment({shipment:this.shipment}).subscribe(
      data => { 
       console.log(data)
       this.rates = data.rates
       this.label.shipment_id = data.shipment_id
      },
      err => console.error(err),
      () => {}
    );
  }

  createLabel(){

    this._apiService.createLabel({shipment:this.shipment, extraInfo: this.extraInfo, label: this.label}).subscribe(
      data => { 
       console.log(data)
       this.router.navigate(['admin/shipments'])
      },
      err => {
        console.error(err)
        Swal.fire({
          type:'error',
          position: 'center',
          title: err.error.error,
        })
      },
      () => {}
    );

  }

  selectParcel(id, price, carrier, i){
     this.label.rate_id = id
     this.label.price = price
     this.label.carrier = carrier
     this.index = i
  }

}
