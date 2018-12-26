import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {SubjectService} from '../_services/subject.service';
import {Subject} from '../_model/Subject';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = [];
  constructor(
    private subjectService: SubjectService,
  ) { }

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
