import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.scss']
})
export class ActiveAccountComponent implements OnInit {

  public hash:string = '';
  public active:boolean = false;
  public error:boolean = false;
  public user:any;

  constructor(
    private route: ActivatedRoute,
    private _apiService: ApiService,
    ) { }

  ngOnInit() {
    this.hash = this.route.snapshot.paramMap.get("hash")
    this.activeAccount(this.hash)
  }

  activeAccount(hash){
    this._apiService.activeAccount(hash).subscribe(
      data => { 
        console.log(data)
        this.user = data.user
        this.active = true
        localStorage.setItem('user_ses', JSON.stringify(this.user))
        localStorage.setItem('token_user', this.api_key)
      },
      err => {
       console.log(err)
       this.error = true;
      },
      () => {
        console.log(this.user)
        
      }
    );
  }

}
