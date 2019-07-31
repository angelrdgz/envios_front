import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
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

  public rates:any

  constructor(
    private _apiService: ApiService

  ) { 
    console.log(this.rates)
  }

  ngOnInit() {
    console.log(this.quote.parcel.length)
  }

  calcWeight(){
    this.volumetric =  (this.quote.parcel.width * this.quote.parcel.length * this.quote.parcel.height) / 5000;
  }

  getQuote() {
    this.rates = []
    this._apiService.quote(this.quote).subscribe(
      data => { this.rates = data.data },
      err => console.error(err),
      () => console.log(this.rates)
    );
  }

}

