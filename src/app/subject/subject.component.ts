import {Component, Input, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import { SubjectService } from '../_services/subject.service';
import { Subject } from '../_model/Subject';
import { Classes } from '../_model/Classes';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  subjects: Subject[] = [];
  private classes = new Classes();
  formCreateSubject: FormGroup;

  validation_messages = {
    'name': [
      {type: 'required', message: 'Name is required'},
      {type: 'max', message: 'Too long'},
      ],
    'credits': [
      {type: 'required', message: 'credits is required'},
      {type: 'min', message: 'At least 1 credit'},
      {type: 'max', message: 'It is too many'}
    ]
  };

  @Input() subject = new Subject();
  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
  ) { }

  ngOnInit() {
    this.formCreateSubject = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.max(50)]),
      credits: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)]),
      });
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
  onClickJoinButton(idSubject) {
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
  onSubmitCreateSubject() {
    this.subjectService.CreateNewSubject(this.subject).subscribe(
      value => {
        if (value.status) {
          swal({
            title: 'Success',
            html: value.message,
            type: 'success'
          });
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
