import {Component, Input, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import { SubjectService } from '../_services/subject.service';
import { Subject } from '../_model/Subject';
import { Classes } from '../_model/Classes';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';

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
    private router: Router
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
  onClickJoinButton(idSubject) {
    swal({
      title: 'Are you sure?',
      html: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        this.classes.idAccount = localStorage.getItem('idAccount');
        this.classes.idSubject = idSubject;
        this.subjectService.CreateClass(this.classes).subscribe(
          value => {
            if (value.status) {
              swal({
                title: 'SUCCESS',
                html: value.message,
                type: 'success',
                timer: 2000
              });
              this.router.navigate(['/class']);
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
    });
  }
  onSubmitCreateSubject() {
    swal({
      title: 'Are you sure?',
      html: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        this.subjectService.CreateNewSubject(this.subject).subscribe(
          value => {
            if (value.status) {
              swal({
                title: 'Success',
                html: value.message,
                type: 'success',
                timer: 2000
              });
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
    });
  }
}
