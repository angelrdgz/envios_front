import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, RouterLinkActive } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-aside',
  templateUrl: './app-aside.component.html',
  styleUrls: ['./app-aside.component.scss']
})
export class AppAsideComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router){ }

  ngOnInit() {
  }

  signOut(){
    localStorage.removeItem('user_ses');
    localStorage.removeItem('token_user');
    localStorage.clear();
    this.router.navigate(['login'])

  }

}
