import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  people: any = [
    { id: 1, name: "Vilnius" }
  ];
    selected: any;
    selected2: any;

  constructor() { }

  ngOnInit() {
  }

}
