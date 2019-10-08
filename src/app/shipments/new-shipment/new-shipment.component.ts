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

  public packages: any;
  public carriers: any;
  public pack: any;
  public packagex: any = { weight: 0, height: 0, width: 0, length: 0 }
  public origenes: any;
  public destinations: any;
  public rates: any
  public countries: any
  public statesOrigin: any
  public statesDestination: any
  public index: number = -1
  public label: any = { rate_id: 0, label_format: "pdf", shipment_id: 0, price: 0, carrier: "" };
  public origenNeights: any;
  public destinationNeights: any;

  public loading: boolean = false
  public volumetric: number = 0

  public rate: any = {
    origin: {
    },
    destination: {
    },
    package: {},
    shipment: {}
  }
  public shipmentErrors: any = {
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
      country: "",
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
      dimensions: {
        length: "",
        width: "",
        height: ""
      },
      content: "",
      weight: "",
      insurance: "",
    }
  }

  public shipment: any = {
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
      country: "MX",
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
      insurance: 0,
      declaredValue: 0
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

  public labelFinish:any = {label: 'http://google.com'}

  public price: number = 0;

  public extraInfo = {
    origen: {
      id: null,
      active: true,
      nickname: "",
      reference: ""
    },
    destination: {
      id: null,
      active: true,
      nickname: "",
      reference: ""
    }
  }

  public loadingQoute: boolean = false
  public shipmentReady: boolean = false
  public loadingShipment: boolean = false
  public user: any

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
    this.shipment.origin.company = this.user.business == 1 ? this.user.company.name : "-";
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
        let index = $active.parent().index()
        switch (index) {
          case 0:
            console.log(this.shipment)
            break;
          case 1:

            break;
          default:
            break;
        }
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

  continue(){

    let errorFound = false;

    if(this.shipment.origin.street == ''){
      this.shipmentErrors.origin.street = 'La calle es requerida';
      errorFound = true;
    }

    if(this.shipment.origin.number == ''){
      this.shipmentErrors.origin.number = 'El numero es requerido';
      errorFound = true;
    }

    if(this.shipment.origin.name == ''){
      this.shipmentErrors.origin.name = 'El nombre es requerido';
      errorFound = true;
    }

    if(this.shipment.origin.company == ''){
      this.shipmentErrors.origin.company = 'La compañia es requerida';
      errorFound = true;
    }

    if(this.shipment.origin.state == ''){
      this.shipmentErrors.origin.state = 'El estado es requerido';
      errorFound = true;
    }
    
    if(this.shipment.origin.postalCode == ''){
      this.shipmentErrors.origin.postalCode = 'El código postal es requerido';
      errorFound = true;
    }

    if(this.shipment.origin.phone == ''){
      this.shipmentErrors.origin.phone = 'El teléfono es requerido';
      errorFound = true;
    }

    if(this.shipment.origin.email == ''){
      this.shipmentErrors.origin.email = 'El email es requerido';
      errorFound = true;
    }

    if(this.shipment.origin.district == ''){
      this.shipmentErrors.origin.district = 'La colonia es requerido';
      errorFound = true;
    }

    if(this.shipment.origin.city == ''){
      this.shipmentErrors.origin.city = 'La ciudad es requerida';
      errorFound = true;
    }
    
    if(this.shipment.destination.street == ''){
      this.shipmentErrors.destination.street = 'La calle es requerida';
      errorFound = true;
    }

    if(this.shipment.destination.number == ''){
      this.shipmentErrors.destination.number = 'El número es requerido';
      errorFound = true;
    }

    if(this.shipment.destination.name == ''){
      this.shipmentErrors.destination.name = 'El nombre es requerido';
      errorFound = true;
    }

    if(this.shipment.destination.company == ''){
      this.shipmentErrors.destination.company = 'La compañia es requerida';
      errorFound = true;
    }

    if(this.shipment.destination.state == ''){
      this.shipmentErrors.destination.state = 'El estado es requerido';
      errorFound = true;
    }
    
    if(this.shipment.destination.postalCode == ''){
      this.shipmentErrors.destination.postalCode = 'El código postal es requerido';
      errorFound = true;
    }

    if(this.shipment.destination.phone == ''){
      this.shipmentErrors.destination.phone = 'El teléfono es requerido';
      errorFound = true;
    }

    if(this.shipment.destination.email == ''){
      this.shipmentErrors.destination.email = 'El email es requerido';
      errorFound = true;
    }

    if(this.shipment.destination.district == ''){
      this.shipmentErrors.destination.district = 'La colonia es requerida';
      errorFound = true;
    }

    if(this.shipment.destination.city == ''){
      this.shipmentErrors.destination.city = 'La ciudad es requerida';
      errorFound = true;
    }

    if(errorFound){
      this.showToast('error', 'Favor de llenar los campos');
    }else{
      try {
        this.shipmentErrors = {
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
            country: "",
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
            dimensions: {
              length: "",
              width: "",
              height: ""
            },
            weight: "",
            insurance: "",
          }
        }
        $('.firstStep').click();
      } catch (error) {
        console.log(error)
      }
      
    }
  }

  onChange(deviceValue) {
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

  showToast(type, message) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 5000,
      background: '#000'
    })

    Toast.fire({
      type: type,
      title: message,
    })
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
          let getState = this.statesDestination.find(state => state.name === data.data.search_results[0].state);
          this.destinationNeights = data.data.search_results.sort((a, b) => a.place_name.localeCompare(b.place_name));
          this.shipment.destination.city = data.data.search_results[0].province
          this.shipment.destination.state = getState.code_2_digits
        },
        err => console.error(err),
        () => {
          console.log(this.destinationNeights)
        }
      );
    }
  }

  searchNeight() {
    let n = this.findObjectByKey(this.origenNeights, 'place_name', this.shipment.origin.district, 1);
  }

  searchNeightTo() {
    let n = this.findObjectByKey(this.destinationNeights, 'place_name', this.shipment.destination.district, 2);
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
      data => { 
        this.origenes = data.data 
      },
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
      () => console.log(this.carriers)
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
    if (id == '') {
      this.shipment.origin.district = ''
      this.shipment.origin.city = ''
      this.shipment.origin.name = ''
      this.shipment.origin.postalCode = ''
      this.shipment.origin.country = ''
      this.shipment.origin.street = ''
      this.shipment.origin.company = ''
      this.shipment.origin.number = ''
      this.shipment.origin.phone = ''
      this.shipment.origin.email = ''
      this.extraInfo.origen.id = null
      this.extraInfo.origen.active = true
      this.extraInfo.origen.nickname = ''

    } else {
      this._apiService.getLocation(id).subscribe(
        data => {
          this.shipment.origin.district = data.data.district
          this.shipment.origin.city = data.data.city
          this.shipment.origin.state = data.data.state
          this.shipment.origin.name = data.data.name
          this.shipment.origin.postalCode = data.data.zipcode
          this.shipment.origin.country = data.data.country
          this.shipment.origin.street = data.data.address
          this.shipment.origin.company = data.data.company
          this.shipment.origin.number = data.data.number
          this.shipment.origin.phone = data.data.phone
          this.shipment.origin.email = data.data.email
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
    if (id == '') {


      this.shipment.destination.district = ''
      this.shipment.destination.city = ''
      this.shipment.destination.name = ''
      this.shipment.destination.postalCode = ''
      this.shipment.destination.country = ''
      this.shipment.destination.street = ''
      this.shipment.destination.company = ''
      this.shipment.destination.number = ''
      this.shipment.destination.phone = ''
      this.shipment.destination.email = ''
      this.extraInfo.destination.id = null
      this.extraInfo.destination.active = true
      this.extraInfo.destination.nickname = ''

    } else {

      this._apiService.getLocation(id).subscribe(
        data => {
          this.shipment.destination.district = data.data.district
          this.shipment.destination.city = data.data.city
          this.shipment.destination.state = data.data.state
          this.shipment.destination.name = data.data.name
          this.shipment.destination.postalCode = data.data.zipcode
          this.shipment.destination.country = data.data.country
          this.shipment.destination.street = data.data.address
          this.shipment.destination.company = data.data.company
          this.shipment.destination.number = data.data.number
          this.shipment.destination.phone = data.data.phone
          this.shipment.destination.email = data.data.email
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

    this._apiService.createLabel({ shipment: this.shipment, extraInfo: this.extraInfo, price: this.price, label: this.label }).subscribe(
      data => {
        console.log(data)
        this.labelFinish.label = data.data.label
        $('.secondStep').click()
        //this.router.navigate(['admin/shipments'])
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

  getQuote() {

    let errorFound = false;

    if(this.shipment.package.content == ''){
      this.shipmentErrors.package.content = 'El contenido es requerido'
      errorFound = true
    }

    if(this.shipment.package.weight == null){
      this.shipmentErrors.package.weight = 'El peso es requerido'
      errorFound = true
    }

    if(this.shipment.package.dimensions.width == null){
      this.shipmentErrors.package.dimensions.width = 'El ancho es requerido'
      errorFound = true
    }

    if(this.shipment.package.dimensions.length == null){
      this.shipmentErrors.package.dimensions.length = 'El largo es requerido'
      errorFound = true
    }

    if(this.shipment.package.dimensions.height == null){
      this.shipmentErrors.package.dimensions.height = 'La altura es requerida'
      errorFound = true
    }

    if(errorFound){
      return false;
    }

    if(this.shipment.package.insurance == null){
      this.shipmentErrors.package.insurance = 0
      errorFound = true
    }

    this.rate.origin = this.shipment.origin
    this.rate.destination = this.shipment.destination
    this.rate.package = this.shipment.package
    this.rate.origin = this.shipment.origin
    this.rates = []

    this.rate.package.dimensions.length = parseInt(this.shipment.package.dimensions.length)
    this.rate.package.dimensions.width = parseInt(this.shipment.package.dimensions.width)
    this.rate.package.dimensions.height = parseInt(this.shipment.package.dimensions.height)
    this.rate.package.weight = parseInt(this.shipment.package.weight)
    this.rate.package.insurance = parseInt(this.shipment.package.insurance)

    for (let index = 0; index < this.carriers.length; index++) {
      this.rate.shipment.carrier = this.carriers[index].name
      this._apiService.quote(this.rate).subscribe(
        data => {
          for (let indey = 0; indey < data.data.data.length; indey++) {
            this.rates.push(data.data.data[indey])
          }
        },
        err => {
          console.error(err)
        },
        () => {
          console.log(this.rates)
        }
      );
    }
  }

  selectParcel(carrier, service, price, i) {
    this.shipment.shipment.carrier = carrier
    this.shipment.shipment.service = service
    this.index = i
    this.price = price
    this.shipmentReady = true;
    console.log(this.shipment)
  }

}
