import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-list-packages',
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.scss']
})
export class ListPackagesComponent implements OnInit {

  public packages

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.getPackages();
  }

  getPackages(){
    this._apiService.getPackages().subscribe(
      data => { this.packages = data.data},
      err => console.error(err),
      () => console.log(this.packages)
    );

  }

}
