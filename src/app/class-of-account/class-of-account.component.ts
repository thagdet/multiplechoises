import { Component, OnInit } from '@angular/core';
import {Subject} from '../_model/Subject';
import swal from 'sweetalert2';
import {ClassOfAccountService} from '../_services/class-of-account.service';

@Component({
  selector: 'app-class-of-account',
  templateUrl: './class-of-account.component.html',
  styleUrls: ['./class-of-account.component.css']
})
export class ClassOfAccountComponent implements OnInit {
  classOfAccount: Subject[];
  public IdRole = <number>localStorage.getItem('IdRole');
  constructor(
    private classOfAccountService: ClassOfAccountService,
  ) { }

  ngOnInit() {
    this.onLoad();
  }

  onLoad() {
    this.classOfAccountService.GetAllSubjectByIdAccount(localStorage.getItem('idAccount')).subscribe(
      value => {
        // console.log(value);
        if (value.status) {
          const data = <Subject[]>value.data;
          this.classOfAccount = data;
        } else {
          console.log('fault');
          swal({
            title: 'Failed',
            html: value.message,
            type: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        }
      }, error => {
        console.log(error);
      },
      () => {
        console.log('completed');
      });
  }
}
