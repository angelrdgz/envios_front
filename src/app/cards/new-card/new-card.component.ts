import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit {

  window.Mercadopago.setPublishableKey("TEST-b235f191-7f76-4a6c-90f6-809fed3623d3")

  public card:any = {owner:"", number:"", month:"", year:"", cvv:""}

  constructor() { }

  ngOnInit() {
  }

  getBin() {
    const cardnumber = this.card.number;
    return cardnumber.substring(0,6);
  }
  
  guessingPaymentMethod(event) {
      var bin = this.getBin();
  
      if (event.type == "keyup") {
          if (bin.length >= 6) {
              window.Mercadopago.getPaymentMethod({
                  "bin": bin
              }, this.setPaymentMethodInfo());
          }
      } else {
          setTimeout(function() {
              if (bin.length >= 6) {
                  window.Mercadopago.getPaymentMethod({
                      "bin": bin
                  }, this.setPaymentMethodInfo());
              }
          }, 100);
      }
  };
  
  setPaymentMethodInfo(status, response) {
      if (status == 200) {
          const paymentMethodElement = document.querySelector('input[name=paymentMethodId]');
  
          if (paymentMethodElement) {
              paymentMethodElement.value = response[0].id;
          } else {
              const input = document.createElement('input');
              input.setattribute('name', 'paymentMethodId');
              input.setAttribute('type', 'hidden');
              input.setAttribute('value', response[0].id);     
  
              form.appendChild(input);
          }
      } else {
          alert(`payment method info error: ${response}`);  
      }
  };

}
