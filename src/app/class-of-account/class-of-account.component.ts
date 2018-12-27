import { Component, OnInit } from '@angular/core';
import {Subject} from '../_model/Subject';
import swal from 'sweetalert2';

@Component({
  selector: 'app-class-of-account',
  templateUrl: './class-of-account.component.html',
  styleUrls: ['./class-of-account.component.css']
})
export class ClassOfAccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.onLoad();
  }

  onLoad() {
    this.subjectService.GetAllSubjectByIdAccount(localStorage.getItem('idAccount')).subscribe(
      value => {
        if (value.status) {
          const data = <Subject[]>value.data;
          this.subjects = data;
        } else {
          console.log('fault');
          swal({
            title: 'Failed',
            html: value.message,
            type: 'error'
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
