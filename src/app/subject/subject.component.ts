import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubjectService } from '../_services/subject.service';
import { Subject } from '../_model/Subject';
import { Classes } from '../_model/Classes';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = [];
  private classes= new Classes();
  constructor(
    private subjectService: SubjectService,
  ) { }

  ngOnInit() {
    this.onLoad();
  }
  onLoad() {
    this.subjectService.GetAllSubjectNotSigned(localStorage.getItem('idAccount')).subscribe(
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
  onClickJoinButton(idSubject){
    this.classes.idAccount = localStorage.getItem('idAccount');
    this.classes.idSubject = idSubject;
    this.subjectService.CreateClass(this.classes).subscribe(
      value => {
        if (value.status) {
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
