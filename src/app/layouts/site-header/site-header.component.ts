import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {
  public title = "Ship2Go"

  pageY:number = 0;

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true); //third parameter
}

ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
}

scroll = (): void => {
  this.pageY = window.pageYOffset
};

}
