import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

declare var Mercadopago: any;
import Mercadopago from 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js';
const doSubmit = false;

@Component({
  selector: 'app-new-recharge',
  templateUrl: './new-recharge.component.html',
  styleUrls: ['./new-recharge.component.scss']
})
export class NewRechargeComponent implements OnInit {

  cardNumber: string = '4075595716483764';
  bin: string = '';
  doSubmit: boolean = false;
  public card: any = { cardNumber: '4075595716483764', email: 'angelrodriguez@ucol.mx', owner: 'Angel David Garcia Rodriguez', token: '', paymentMethod: '', }


  constructor(private _apiService: ApiService, ) {
    Mercadopago.setPublishableKey("TEST-b235f191-7f76-4a6c-90f6-809fed3623d3");
  }

  ngOnInit() {
    /*Mercadopago.getPaymentMethod({
      "bin": this.bin
  }, this.setPaymentMethodInfo);*/
  }

  getBin() {
    return this.cardNumber.substring(0, 6);
  }

  guessingPaymentMethod(event) {
    this.bin = this.getBin();
    if (event.type == "keyup") {
      if (this.bin.length >= 6) {
        Mercadopago.getPaymentMethod({
          "bin": this.bin
        }, this.setPaymentMethodInfo);
      }
    } else {
      setTimeout(function () {
        if (this.bin.length >= 6) {
          Mercadopago.getPaymentMethod({
            "bin": this.bin
          }, this.setPaymentMethodInfo);
        }
      }, 100);
    }
  };

  setPaymentMethodInfo(status, response) {
    console.log('resultado', response)
    if (status == 200) {
      //this.card.paymentMethod = response[0].id 
      const paymentMethodElement = (<HTMLInputElement>document.getElementById("paymentMethodId"));
      console.log(paymentMethodElement)

      if (paymentMethodElement) {
        paymentMethodElement.value = response[0].id;
      } else {
        var $form = document.querySelector('#pay');
        const input = document.createElement('input');
        input.setAttribute('name', 'paymentMethodId');
        input.setAttribute('type', 'hidden');
        input.setAttribute('value', response[0].id);

        $form.appendChild(input);
      }
    } else {
      alert(`payment method info error: ${response}`);
    }
  }

  

  public doPay(event) {
    event.preventDefault();
    if (!this.doSubmit) {
      var $form = document.querySelector('#pay');
      Mercadopago.createToken($form, this.sdkResponseHandler); // The function "sdkResponseHandler" is defined below
      return false;
    }
  };

  public sendData() {

    const dataForm = {};
    for(let i in document.getElementsByTagName('input')) {
     dataForm[document.getElementsByTagName('input')[i].name] = document.getElementsByTagName('input')[i].value;
   }
   console.log(dataForm);
    this._apiService.makePayment(dataForm).subscribe(
      data => { console.log(data) },
      err => {
        console.log(err)
      },
      () => {

      }

    );
  }

  public sdkResponseHandler(status, response) {
    console.log(response)
    if (status != 200 && status != 201) {
      alert("verify filled data");
    } else {
      var form = document.querySelector('#pay');
      var link = document.getElementById('sendData');
      var card = document.createElement('input');
      card.setAttribute('name', 'token');
      card.setAttribute('type', 'hidden');
      card.setAttribute('value', response.id);
      form.appendChild(card);
      this.doSubmit = true
      link.click();
    }
  };

}
