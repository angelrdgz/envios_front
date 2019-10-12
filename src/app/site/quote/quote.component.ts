import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { EnviaService } from '../../services/envia.service';
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
        
          query(':leave', stagger('100ms', [
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

  public volumetric:number = 0.00;
  public loading: boolean = false;

  public quote =
  {
    "origin": {
        "name": "Raymundo Salazar",
        "company": "Example Company",
        "email": "raymundo@example.com",
        "phone": "81818181",
        "street": "Av Vasconcelos",
        "number": "1400",
        "district": "Palo Blanco",
        "city": "Monterrey",
        "state": "NL",
        "country": "MX",
        "postalCode": ""
    },
    "destination": {
        "name": "Gina Colin",
        "company": "Example Company",
        "email": "gina@company.com",
        "phone": "8181818181",
        "street": "Av Vasconcelos",
        "number": "1400",
        "district": "Palo Blanco",
        "city": "Monterrey",
        "state": "NL",
        "country": "MX",
        "postalCode": ""
    },
    "package": {
        "content": "jewels",
        "amount": 1,
        "type": "box",
        "dimensions": {
            "length": null,
            "width": null,
            "height": null
        },
        "weight": null,
        "insurance": 0,
        "declaredValue": 0
    },
    "shipment": {
        "carrier": "dhlws"
    }
};

  public rates:any
  public carriers:any;

  constructor(
    private _apiService: ApiService,
    private _enviaService: EnviaService

  ) { 
    console.log(this.rates)
  }

  ngOnInit() {
    this.getCarriers('MX');
    //console.log(this.quote.parcel.length)
  }

  calcWeight(){
    //this.volumetric =  (this.quote.parcel.width * this.quote.parcel.length * this.quote.parcel.height) / 5000;
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

  getQuote() {
    this.loading = true;

    this.quote.package.dimensions.width = parseInt(this.quote.package.dimensions.width)
    this.quote.package.dimensions.length = parseInt(this.quote.package.dimensions.length)
    this.quote.package.dimensions.height = parseInt(this.quote.package.dimensions.height)
    this.quote.package.weight = parseInt(this.quote.package.weight)
    this.rates = []

    for (let index = 0; index < this.carriers.length; index++) {
      this.quote.shipment.carrier = this.carriers[index].name
      this._apiService.quoteSite(this.quote).subscribe(
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

    this.loading = false;
    /*this._enviaService.quote(this.quote).subscribe(
      data => { 
        this.rates = data.data;
        this.loading = false;
      },
      err => console.error(err),
      () => {
        this.loading = false;
      }
    );*/
  }

}

