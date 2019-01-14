import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TestDetail} from '../_model/TestDetail';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {TestDetailService} from '../_services/test-detail.service';
import {QuestionComponent} from '../question/question.component';
import {Dataservice} from './dataservice';

@Component({
  selector: 'app-list-test-detail',
  templateUrl: './list-test-detail.component.html',
  styleUrls: ['./list-test-detail.component.css']
})
export class ListTestDetailComponent implements OnInit, OnDestroy {
  formCreateTestDetail: FormGroup;
  testDetails: TestDetail[];
  private sub: any;
  idTestDetail: string;
  private IdRole = localStorage.getItem('IdRole');

  validation_messages = {
    'description': [{type: 'required', message: 'Description is required'}],
    'duration': [
        {type: 'required', message: 'Duration is required'},
        {type: 'min', message: 'At least 10 minutes'},
        {type: 'max', message: 'It is too many, they can not concentrate all that time'}
      ],
    'quantityOfQuestions': [
        {type: 'required', message: 'This is required'},
        {type: 'min', message: 'At least 10 question'},
        {type: 'max', message: 'It is too many, Student will thank you if it is less than 60'}
    ]
  };

  @Input() testDetail = new TestDetail();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private testDetailService: TestDetailService,
    public dataService: Dataservice,
    private question: QuestionComponent,
  ) { }

  ngOnInit() {
    this.formCreateTestDetail = this.fb.group({
      description: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required, Validators.min(10), Validators.max(180)]),
      quantityOfQuestions: new FormControl('', [Validators.required, Validators.min(10), Validators.max(60)])
    });

    this.sub = this.route.params.subscribe(params => {
      this.testDetail.idSubject = params['idSubject'];
    });

    this.OnLoad();
  }

  OnLoad() {
    this.testDetailService.GetAllTestDetailByIdSubject(this.testDetail.idSubject).subscribe(
      value => {
        // console.log(value);
        if (value.status) {
          const data = <TestDetail[]>value.data;
          this.testDetails = data;
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
  onSubmitCreateTestDetail() {
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
        this.testDetailService.CreateTestDetail(this.testDetail).subscribe(
          value => {
            // console.log(value);
            if (value.status) {
              // const data = <TestDetail>value.data;
              document.getElementById('closeLoginModal').click();
              swal({
                title: 'SUCCESS',
                html: value.message,
                type: 'success',
                timer: 2000
              });
              location.reload();
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

  updateTestDetail(testDetail: TestDetail) {
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
        this.testDetailService.UpdateTestDetail(testDetail).subscribe(
          value => {
            // console.log(value);
            if (value.status) {
              // const data = <TestDetail>value.data;
              swal({
                title: 'SUCCESS',
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

  getIdTestDetail(idTestDetail) {
    this.idTestDetail = idTestDetail;
  }

  ngOnDestroy() {
    this.dataService.idSubject = this.testDetail.idSubject;
    this.dataService.idTestDetail = this.idTestDetail;
  }
}
