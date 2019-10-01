import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SrenvioService } from './../../services/srenvio.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2'

declare var $: any;

@Component({
  selector: 'new-shipment',
  templateUrl: './new-shipment.component.html',
  styleUrls: ['./new-shipment.component.scss'],
  animations: [

    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])

  ]
})
export class NewShipmentComponent implements OnInit {

  public packages:any;
  public pack: any;
  public packagex: any = { weight: 0, height: 0, width: 0, length: 0 }
  public origenes: any;
  public destinations: any;
  public rates: any
  public countries:any
  public index: number = -1
  public label: any = { rate_id: 0, label_format: "pdf", shipment_id: 0, price: 0, carrier: "" };
  public origenNeights: any;
  public destinationNeights: any;

  public loading:boolean = false
  public volumetric:number = 0

  public quote:any;

  public qoute:any = {
    package:{
      dimensions:{
        height:0,
        width:0,
        length:0
      },
      weight:0,
    }
  }

  public shipment: any = {
    address_from: {
      province: "",
      city: "",
      name: "",
      zip: "",
      country: "MX",
      address1: "",
      company: "",
      address2: "",
      phone: "",
      email: ""
    },
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
      country: "MX",
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
    origen: {
      id: null,
      active: true,
      nickname: ""
    },
    destination: {
      id: null,
      active: true,
      nickname: ""
    }
  }

  public loadingQoute:boolean = false
  public loadingShipment:boolean = false

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

    $(document).ready(function () {
      //Initialize tooltips
      $('.nav-tabs > li a[title]').tooltip();
      
      //Wizard
      $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {  
          var $target = $(e.target);      
          if ($target.parent().hasClass('disabled')) {
              return false;
          }
      });
  
      $(".next-step").click(function (e) {
  
          var $active = $('.nav-tabs li > a.active');
          $active.parent().next().find('a').removeClass('disabled');
          nextTab($active);
  
      });
      $(".prev-step").click(function (e) {
  
          var $active = $('.nav-tabs li>a.active');
          prevTab($active);
  
      });
  });
  
  function nextTab(elem) {
      $(elem).parent().next().find('a[data-toggle="tab"]').click();
  }
  function prevTab(elem) {
      $(elem).parent().prev().find('a[data-toggle="tab"]').click();
  }
  }

  onChange(deviceValue) {
    console.log('Paquete', deviceValue)
    if (deviceValue != '') {
      this.getPackage(deviceValue)
    } else {
      this.shipment.parcels[0].weight = 0
      this.shipment.parcels[0].height = 0
      this.shipment.parcels[0].width = 0
      this.shipment.parcels[0].length = 0
      this.shipment.address_to.contents = ''
    }
  }

  getNeightsFrom() {

    if (this.shipment.address_from.zip.length >= 4) {
      this._apiService.getNeights({ zip_code: this.shipment.address_from.zip, country_code: this.shipment.address_from.country, within: 3, unit: "Miles" }).subscribe(
        data => {
          this.origenNeights = data.data.search_results.sort((a, b) => a.place_name.localeCompare(b.place_name));
          this.shipment.address_from.city = data.data.search_results[0].province
          this.shipment.address_from.province = data.data.search_results[0].state
        },
        err => console.error(err),
        () => {
          console.log(this.origenNeights)
        }
      );
    }

  }

  getNeightsTo() {

    if (this.shipment.address_to.zip.length >= 4) {
      this._apiService.getNeights({ zip_code: this.shipment.address_to.zip, country_code: this.shipment.address_to.country, within: 3, unit: "Miles" }).subscribe(
        data => {
          this.destinationNeights = data.data.search_results.sort((a, b) => a.place_name.localeCompare(b.place_name));
          this.shipment.address_to.city = data.data.search_results[0].province
          this.shipment.address_to.province = data.data.search_results[0].state
        },
        err => console.error(err),
        () => {
          console.log(this.destinationNeights)
        }
      );
    }

  }

  searchNeight() {
    let n = this.findObjectByKey(this.origenNeights, 'place_name', this.shipment.address_from.address2, 1);
  }

  searchNeightTo() {
    let n = this.findObjectByKey(this.destinationNeights, 'place_name', this.shipment.address_to.address2, 2);
  }

  findObjectByKey(array, key, value, x) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        if (x == 1) {
          this.shipment.address_from.city = array[i].province
          this.shipment.address_from.province = array[i].state
        } else {
          this.shipment.address_to.city = array[i].province
          this.shipment.address_to.province = array[i].state
        }
        console.log(this.shipment.address_from)
        break
      }
    }
  }

  getLocationsOrigin() {

    this._apiService.getOrigenes().subscribe(
      data => { this.origenes = data.data },
      err => console.error(err),
      () => {
        if (this.origenes.length == 0) {
          this.extraInfo.origen.active = true
        }
      }
    );

  }

  getLocationsDestination() {
    this._apiService.getDestinations().subscribe(
      data => { this.destinations = data.data },
      err => console.error(err),
      () => {
        if (this.destinations.length == 0) {
          this.extraInfo.destination.active = true
        }
      }
    );
  }

  getPackages() {
    this._apiService.getPackages().subscribe(
      data => { this.packages = data.data },
      err => console.error(err),
      () => console.log(this.packages)
    );
  }
  getCountries() {
    this._apiService.getCountries().subscribe(
      data => { 
        console.log(data)
        this.countries = data.data
      },
      err => console.error(err),
      () => ''
    );
  }

  getPackage(id) {
    this._apiService.getPackage(id).subscribe(
      data => {
        this.shipment.parcels[0].weight = parseInt(data.data.weight)
        this.shipment.parcels[0].height = parseInt(data.data.height)
        this.shipment.parcels[0].width = parseInt(data.data.width)
        this.shipment.parcels[0].length = parseInt(data.data.length)
        this.shipment.address_to.contents = data.data.contents
      },
      err => console.error(err),
      () => console.log(this.packagex)
    );
  }

  getOrigen(id) {
    if(id == ''){
      this.shipment.address_from.province = ''
      this.shipment.address_from.city = ''
      this.shipment.address_from.name = ''
      this.shipment.address_from.zip = ''
      this.shipment.address_from.country = ''
      this.shipment.address_from.address1 = ''
      this.shipment.address_from.company = ''
      this.shipment.address_from.address2 = ''
      this.shipment.address_from.phone = ''
      this.shipment.address_from.email = ''
      this.shipment.address_from.reference = ''
      this.extraInfo.origen.id = null
      this.extraInfo.origen.active = true
      this.extraInfo.origen.nickname = ''

    }else{
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
          this.extraInfo.origen.active = false
          this.extraInfo.origen.nickname = data.data.nickname
        },
        err => console.error(err),
        () => console.log(this.extraInfo)
      );

    }
  }

  getDestination(id) {
    if(id == ''){


          this.shipment.address_to.province = ''
          this.shipment.address_to.city = ''
          this.shipment.address_to.name = ''
          this.shipment.address_to.zip = ''
          this.shipment.address_to.country = ''
          this.shipment.address_to.address1 = ''
          this.shipment.address_to.company = ''
          this.shipment.address_to.address2 = ''
          this.shipment.address_to.phone = ''
          this.shipment.address_to.email = ''
          this.shipment.address_to.reference = ''
          this.extraInfo.destination.id = null
          this.extraInfo.destination.active = true
          this.extraInfo.destination.nickname = ''

    }else{

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
          this.extraInfo.destination.active = false
          this.extraInfo.destination.nickname = data.data.nickname
        },
        err => console.error(err),
        () => console.log(this.extraInfo)
      );

    }
    
  }

  createShipment() {
    this.loadingQoute = true;
    this._apiService.createShipment({ shipment: this.shipment }).subscribe(
      data => {
        console.log(data)
        this.rates = data.rates
        this.label.shipment_id = data.shipment_id
      },
      err => {
        console.error(err)
        this.loadingQoute = false;
      },
      () => { this.loadingQoute = false; }
    );
  }

  createLabel() {

    this.loadingShipment = true;

    this._apiService.createLabel({ shipment: this.shipment, extraInfo: this.extraInfo, label: this.label }).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['admin/shipments'])
      },
      err => {
        console.error(err)
        Swal.fire({
          type: 'error',
          position: 'center',
          title: err.error.error,
        })

        this.loadingShipment = false;
      },
      () => {
        this.loadingShipment = false;
      }
    );

  }

  getQuote(){
    console.log('Hola')
  }

  selectParcel(id, price, carrier, i) {
    this.label.rate_id = id
    this.label.price = price
    this.label.carrier = carrier
    this.index = i
  }

}
