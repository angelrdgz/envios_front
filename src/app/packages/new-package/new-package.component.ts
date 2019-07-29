import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-new-package',
  templateUrl: './new-package.component.html',
  styleUrls: ['./new-package.component.scss']
})
export class NewPackageComponent implements OnInit {

  public package:any = {name:'',weight:'',width:'',height:'',length:'',type:'',contents:''}

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
  }

  savePackage(){
    this._apiService.savePackage(this.package).subscribe(
      data => { console.log(data)},
      err => console.error(err.error),
      () => console.log()
    );
  }

}
