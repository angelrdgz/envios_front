import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-detail-shipment',
  templateUrl: './detail-shipment.component.html',
  styleUrls: ['./detail-shipment.component.scss']
})
export class DetailShipmentComponent implements OnInit {

  public shipment:any = {
    origin:{
      street: 'Av. empresarios',
      number: ' 255 Int 9',
      district: 'Puerta de Hierro',
      city:'Zapopan',
      state:'Jalisco',
      country:'MX',
    },
    destination:{},
    eventHistory:[
      {
        "event": null,
        "description": "Entregado",
        "location": "VALLEJO, CDMX",
        "date": "2019-02-27 14:52:00"
      },
      {
        "event": null,
        "description": "En ruta de entrega",
        "location": "VALLEJO, CDMX",
        "date": "2019-02-27 10:49:00"
      },
      {
        "event": null,
        "description": "Recibido en oficina",
        "location": "VALLEJO, CDMX",
        "date": "2019-02-27 08:06:00"
      },
      {
        "event": null,
        "description": "Recibido en oficina",
        "location": "VALLEJO, CDMX",
        "date": "2019-02-27 06:55:00"
      },
      {
        "event": null,
        "description": "Recibido en oficina",
        "location": "TULTITLAN, EDO. MEX.",
        "date": "2019-02-27 03:30:00"
      },
      {
        "event": null,
        "description": "Salida de oficina",
        "location": "TULTITLAN, MEXICO",
        "date": "2019-02-27 03:07:00"
      },
      {
        "event": null,
        "description": "Recibido en oficina",
        "location": "TULTITLAN, MEXICO",
        "date": "2019-02-27 02:05:00"
      },
      {
        "event": null,
        "description": "Recibido en oficina",
        "location": "TULTITLAN, MEXICO",
        "date": "2019-02-27 01:59:00"
      },
      {
        "event": null,
        "description": "Salida de oficina",
        "location": "GUADALAJARA, JALISCO",
        "date": "2019-02-26 20:13:00"
      },
      {
        "event": null,
        "description": "RECEPCION DE RUTA DE RECOLECCION",
        "location": "GUADALAJARA, JALISCO",
        "date": "2019-02-26 19:54:00"
      },
      {
        "event": null,
        "description": "Salida de oficina",
        "location": "MOSTRADOR CLOUTHIER",
        "date": "2019-02-26 15:17:00"
      },
      {
        "event": null,
        "description": "Registrado en sistema",
        "location": "MOSTRADOR CLOUTHIER",
        "date": "2019-02-26 15:17:00"
      }
    ],
    details:{}
  };

  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
    this.route.paramMap.subscribe(params => {
      this.tracking(params.get('id'))
    });
  }

  getShipment(id){
    this._apiService.getShipment(id).subscribe(
      data => { this.shipment = data.data},
      err => console.error(err),
      () => console.log(this.shipment)
    );
  }

  tracking(id){

    this._apiService.shipmentTracking(id).subscribe(
      data => { this.shipment = data.data},
      err => console.error(err),
      () => console.log(this.shipment)
    );

  }

}
