import {Component, Input, OnInit} from '@angular/core';
import {TestDetail} from '../_model/TestDetail';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {TestDetailService} from '../_services/test-detail.service';
import {CreateTestComponent} from '../create-test/create-test.component';
import {Question} from '../_model/Question';
import {QuestionComponent} from '../question/question.component';

@Component({
  selector: 'app-list-test-detail',
  templateUrl: './list-test-detail.component.html',
  styleUrls: ['./list-test-detail.component.css']
})
export class ListTestDetailComponent implements OnInit {
  formCreateTestDetail: FormGroup;
  testDetails: TestDetail[];
  private sub: any;

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
    private createTest: CreateTestComponent,
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
  onSubmitCreateTestDetail() {
    this.testDetailService.CreateTestDetail(this.testDetail).subscribe(
      value => {
        // console.log(value);
        if (value.status) {
          // const data = <TestDetail>value.data;
          document.getElementById('closeLoginModal').click();
          swal({
            title: 'SUCCESS',
            html: value.message,
            type: 'success'
          });
          location.reload();
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

  updateTestDetail(testDetail: TestDetail) {
    this.testDetailService.UpdateTestDetail(testDetail).subscribe(
      value => {
        // console.log(value);
        if (value.status) {
          // const data = <TestDetail>value.data;
          swal({
            title: 'SUCCESS',
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

  /*doTest(IDTestDetail) {
    this.createTest.getTest(this.testDetail.idSubject, IDTestDetail);
  }*/

  Notificate() {
    swal({
      imageUrl: '../../assets/images/loading3.gif',
      imageAlt: 'Loading ...',
      showConfirmButton: false
    });
  }

  showQuestion(IDTestDetail) {
    this.question.getIdTestDetail(IDTestDetail);
  }
}
