import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  public userHeader:any;

  constructor() { }

  ngOnInit() {
    this.userHeader = JSON.parse(localStorage.getItem('user_ses'));
    console.log(this.userHeader)
  }

}
