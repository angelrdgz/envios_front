import { Component, OnInit } from '@angular/core';
import { SrenvioService } from './../../services/srenvio.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
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
export class QuoteComponent implements OnInit {

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

  public rates:any

  constructor(
    private _srEnvioService: SrenvioService

  ) { 
    console.log(this.rates)
  }

  ngOnInit() {
    //this.getQuote();
  }

  getQuote() {
    this.rates = []
    this._srEnvioService.quote(this.quote).subscribe(
      data => { this.rates = data },
      err => console.error(err),
      () => console.log(this.rates)
    );
    /*this.rates = [
      {
          "amount_local": "110.0",
          "currency_local": "MXN",
          "provider": "CARSSA",
          "service_level_name": "Nacional",
          "service_level_code": "NACIONAL",
          "days": 10,
          "insurable": true,
          "out_of_area_service": false,
          "out_of_area_pricing": 0.00,
          "total_pricing": "110.0"
      },
      {
          "amount_local": "169.0",
          "currency_local": "MXN",
          "provider": "ESTAFETA",
          "service_level_name": "Terrestre",
          "service_level_code": "ESTAFETA_STANDARD",
          "days": 5,
          "insurable": true,
          "out_of_area_service": null,
          "out_of_area_pricing": 0.00,
          "total_pricing": "169.0"
      },
      {
          "amount_local": "229.0",
          "currency_local": "MXN",
          "provider": "FEDEX",
          "service_level_name": "Fedex Express Saver",
          "service_level_code": "FEDEX_EXPRESS_SAVER",
          "days": 5,
          "insurable": true,
          "out_of_area_service": null,
          "out_of_area_pricing": 0.00,
          "total_pricing": "229.0"
      },
      {
          "amount_local": "283.0",
          "currency_local": "MXN",
          "provider": "REDPACK",
          "service_level_name": "Ecoexpress",
          "service_level_code": "ECOEXPRESS",
          "days": 5,
          "insurable": true,
          "out_of_area_service": false,
          "out_of_area_pricing": 0.00,
          "total_pricing": "283.0"
      },
      {
          "amount_local": "361.0",
          "currency_local": "MXN",
          "provider": "ESTAFETA",
          "service_level_name": "Servicio Express",
          "service_level_code": "ESTAFETA_NEXT_DAY",
          "days": 2,
          "insurable": true,
          "out_of_area_service": null,
          "out_of_area_pricing": 0.00,
          "total_pricing": "361.0"
      },
      {
          "amount_local": "382.0",
          "currency_local": "MXN",
          "provider": "FEDEX",
          "service_level_name": "Standard Overnight",
          "service_level_code": "STANDARD_OVERNIGHT",
          "days": 1,
          "insurable": true,
          "out_of_area_service": null,
          "out_of_area_pricing": 0.00,
          "total_pricing": "382.0"
      },
      {
          "amount_local": "540.0",
          "currency_local": "MXN",
          "provider": "UPS",
          "service_level_name": "UPS Express",
          "service_level_code": "EXPRESS_SAVER",
          "days": 2,
          "insurable": false,
          "out_of_area_service": false,
          "out_of_area_pricing": 0.00,
          "total_pricing": "540.0"
      },
      {
          "amount_local": "680.0",
          "currency_local": "MXN",
          "provider": "REDPACK",
          "service_level_name": "Express",
          "service_level_code": "EXPRESS",
          "days": 2,
          "insurable": true,
          "out_of_area_service": false,
          "out_of_area_pricing": 0.00,
          "total_pricing": "680.0"
      }
    ]*/
  }

}

