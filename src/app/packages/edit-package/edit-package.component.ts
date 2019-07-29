import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss']
})
export class EditPackageComponent implements OnInit {

  public package:any;
  public packageId:string;

  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.packageId = params.get('id');
      this.getPackage(params.get('id'))
    });
  }

  getPackage(id){

    this._apiService.getPackage(id).subscribe(
      data => { this.package = data.data},
      err => console.error(err.error),
      () => console.log()
    );

  }

  updatePackage(){
    this._apiService.updatePackage(this.packageId, this.package).subscribe(
      data => { console.log(data)},
      err => console.error(err.error),
      () => this.router.navigate(['admin/packages'])
    );
  }

}
