import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public info:any = {name:'', email:'', phone:'', comments:''}
  public infoErrors:any = {name:'', email:'', phone:'', comments:''}
  contactForm: FormGroup;
  public loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _apiService: ApiService
  ) { }

  get f() { return this.contactForm.controls; }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      comments: ['', Validators.required],
    });
  }

  contact(form){

    this.infoErrors = {name:'', email:'', phone:'', comments:''}

    this.loading = true;

    this._apiService.contact(this.info).subscribe(
      data => {  },
      err => {
        this.infoErrors = err.error.errors
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );

  }

}
