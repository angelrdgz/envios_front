import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-detail-shipment',
  templateUrl: './detail-shipment.component.html',
  styleUrls: ['./detail-shipment.component.scss']
})
export class DetailShipmentComponent implements OnInit {

  public shipment:any;

  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getShipment(params.get('id'))
    });
  }

  getShipment(id){
    this._apiService.getShipment(id).subscribe(
      data => { this.shipment = data.data},
      err => console.error(err),
      () => console.log(this.shipment)
    );
  }

}
