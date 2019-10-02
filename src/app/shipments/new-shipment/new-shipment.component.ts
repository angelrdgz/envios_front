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
  public carriers:any;
  public pack: any;
  public packagex: any = { weight: 0, height: 0, width: 0, length: 0 }
  public origenes: any;
  public destinations: any;
  public rates: any
  public countries:any
  public statesOrigin:any
  public statesDestination:any
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

  public shipment:any = {
    origin: {
        name: "",
        company: "",
        email: "",
        phone: "",
        street: "",
        number: "",
        district: "",
        city: "",
        state: "",
        country: "MX",
        postalCode: ""
    },
    destination: {
        name: "",
        company: "",
        email: "",
        phone: "",
        street: "",
        number: "",
        district: "",
        city: "",
        state: "",
        country: "",
        postalCode: ""
    },
    package: {
        content: "",
        amount: 1,
        type: "box",
        dimensions: {
            length: null,
            width: null,
            height: null
        },
        weight: null,
        lengthUnit: "CM",
        weightUnit: "KG",
        insurance: null,
        declaredValue: null
    },
    shipment: {
        carrier: "",
        service: ""
    },
    settings: {
        currency: "MXN",
        labelFormat: "PDF",
        cashOnDelivery: 100.00,
        comments: "comentarios de el envío"
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
  public user:any

  constructor(
    private _apiService: ApiService,
    private _srEnvioService: SrenvioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user_ses'));
    this.shipment.origin.name = this.user.name;
    this.shipment.origin.email = this.user.email;
    this.shipment.origin.company = this.user.business == 1 ? this.user.company.name:"-";
    this.getLocationsOrigin()
    this.getLocationsDestination()
    this.getPackages()
    this.getCountries()
    this.getStatesOrigin("MX")
    this.getStatesDestination("MX")

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
      this.shipment.package.dimensions.weight = 0
      this.shipment.package.dimensions.height = 0
      this.shipment.package.dimensions.width = 0
      this.shipment.package.dimensions.length = 0
      this.shipment.destination.contents = ''
    }
  }

  getNeightsFrom() {

    if (this.shipment.origin.postalCode.length >= 5) {
      this._apiService.getNeights({ zip_code: this.shipment.origin.postalCode, country_code: this.shipment.origin.country, within: 3, unit: "Miles" }).subscribe(
        data => {
          let getState = this.statesOrigin.find(state => state.name === data.data.search_results[0].state);
          this.origenNeights = data.data.search_results.sort((a, b) => a.place_name.localeCompare(b.place_name));
          this.shipment.origin.city = data.data.search_results[0].province
          this.shipment.origin.state = getState.code_2_digits
        },
        err => console.error(err),
        () => {
          console.log(this.origenNeights)
        }
      );
    }

  }

  getNeightsTo() {

    if (this.shipment.destination.postalCode.length >= 5) {
      this._apiService.getNeights({ zip_code: this.shipment.destination.postalCode, country_code: this.shipment.destination.country, within: 3, unit: "Miles" }).subscribe(
        data => {
          this.destinationNeights = data.data.search_results.sort((a, b) => a.place_name.localeCompare(b.place_name));
          this.shipment.destination.city = data.data.search_results[0].province
          this.shipment.destination.province = data.data.search_results[0].state
        },
        err => console.error(err),
        () => {
          console.log(this.destinationNeights)
        }
      );
    }

  }

  searchNeight() {
    let n = this.findObjectByKey(this.origenNeights, 'place_name', this.shipment.origin.address2, 1);
  }

  searchNeightTo() {
    let n = this.findObjectByKey(this.destinationNeights, 'place_name', this.shipment.destination.address2, 2);
  }

  findObjectByKey(array, key, value, x) {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
        if (x == 1) {
          this.shipment.origin.city = array[i].province
          this.shipment.origin.province = array[i].state
        } else {
          this.shipment.destination.city = array[i].province
          this.shipment.destination.province = array[i].state
        }
        console.log(this.shipment.origin)
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

  getCarriers(code) {
    this._apiService.getCarriers(code).subscribe(
      data => {
        this.carriers = data.data
      },
      err => console.error(err),
      () => ''
    );
  }

  getStatesOrigin(code) {
    this.getCarriers(code)
    this._apiService.getStates(code).subscribe(
      data => { 
        console.log(data)
        this.statesOrigin = data.data
      },
      err => console.error(err),
      () => ''
    );
  }

  getStatesDestination(code) {
    this._apiService.getStates(code).subscribe(
      data => { 
        console.log(data)
        this.statesDestination = data.data
      },
      err => console.error(err),
      () => ''
    );
  }

  getPackage(id) {
    this._apiService.getPackage(id).subscribe(
      data => {
        this.shipment.package.weight = parseInt(data.data.weight)
        this.shipment.package.dimensions.height = parseInt(data.data.height)
        this.shipment.package.dimensions.width = parseInt(data.data.width)
        this.shipment.package.dimensions.length = parseInt(data.data.length)
        this.shipment.package.content = data.data.contents
      },
      err => console.error(err),
      () => console.log(this.packagex)
    );
  }

  getOrigen(id) {
    if(id == ''){
      this.shipment.origin.province = ''
      this.shipment.origin.city = ''
      this.shipment.origin.name = ''
      this.shipment.origin.zip = ''
      this.shipment.origin.country = ''
      this.shipment.origin.address1 = ''
      this.shipment.origin.company = ''
      this.shipment.origin.address2 = ''
      this.shipment.origin.phone = ''
      this.shipment.origin.email = ''
      this.shipment.origin.reference = ''
      this.extraInfo.origen.id = null
      this.extraInfo.origen.active = true
      this.extraInfo.origen.nickname = ''

    }else{
      this._apiService.getLocation(id).subscribe(
        data => {
          this.shipment.origin.province = data.data.state
          this.shipment.origin.city = data.data.city
          this.shipment.origin.name = data.data.nickname
          this.shipment.origin.zip = data.data.zipcode
          this.shipment.origin.country = data.data.country
          this.shipment.origin.address1 = data.data.address
          this.shipment.origin.company = data.data.company
          this.shipment.origin.address2 = data.data.address2
          this.shipment.origin.phone = data.data.phone
          this.shipment.origin.email = data.data.email
          this.shipment.origin.reference = data.data.reference
          this.extraInfo.origen.id = data.data.id
          this.extraInfo.origen.active = false
          this.extraInfo.origen.nickname = data.data.nickname
        },
        err => console.error(err),
        () => console.log(this.shipment.origin)
      );

    }
  }

  getDestination(id) {
    if(id == ''){


          this.shipment.destination.province = ''
          this.shipment.destination.city = ''
          this.shipment.destination.name = ''
          this.shipment.destination.zip = ''
          this.shipment.destination.country = ''
          this.shipment.destination.address1 = ''
          this.shipment.destination.company = ''
          this.shipment.destination.address2 = ''
          this.shipment.destination.phone = ''
          this.shipment.destination.email = ''
          this.shipment.destination.reference = ''
          this.extraInfo.destination.id = null
          this.extraInfo.destination.active = true
          this.extraInfo.destination.nickname = ''

    }else{

      this._apiService.getLocation(id).subscribe(
        data => {
          this.shipment.destination.province = data.data.state
          this.shipment.destination.city = data.data.city
          this.shipment.destination.name = data.data.nickname
          this.shipment.destination.zip = data.data.zipcode
          this.shipment.destination.country = data.data.country
          this.shipment.destination.address1 = data.data.address
          this.shipment.destination.company = data.data.company
          this.shipment.destination.address2 = data.data.address2
          this.shipment.destination.phone = data.data.phone
          this.shipment.destination.email = data.data.email
          this.shipment.destination.reference = data.data.reference
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
    console.log(this.shipment)
  }

  selectParcel(id, price, carrier, i) {
    this.label.rate_id = id
    this.label.price = price
    this.label.carrier = carrier
    this.index = i
  }

}
