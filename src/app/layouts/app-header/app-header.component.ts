import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  public userHeader:any;
  public balance:number = 0

  constructor() { }

  ngOnInit() {
    this.userHeader = JSON.parse(localStorage.getItem('user_ses'));
    this.balance = this.userHeader.business == 0 ? this.userHeader.balance:this.userHeader.company.balance
  }

}
