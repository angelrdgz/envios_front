import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit {


  public card:any = {owner:"", number:"", month:"", year:"", cvv:""}

  constructor() { }

  ngOnInit() {
  }
}
