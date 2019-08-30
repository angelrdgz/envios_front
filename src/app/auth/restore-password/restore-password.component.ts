import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

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
  }

}
