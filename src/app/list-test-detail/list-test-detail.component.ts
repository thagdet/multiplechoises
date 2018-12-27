import {Component, Input, OnInit} from '@angular/core';
import {TestDetail} from '../_model/TestDetail';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Account} from '../_model/Account';
import swal from 'sweetalert2';
import {TestDetailService} from '../_services/test-detail.service';

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
  ) { }

  ngOnInit() {
    this.formCreateTestDetail = this.fb.group({
      description: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required, Validators.min(10), Validators.max(180)]),
      quantityOfQuestions: new FormControl('', [Validators.required, Validators.min(10), Validators.max(60)])
    });
  }

  onSubmitCreateTestDetail() {
    this.sub = this.route.params.subscribe(params => {
      this.testDetail.idSubject = params['idSubject'];
    });
    this.testDetailService.CreateTestDetail(this.testDetail).subscribe(
      value => {
        console.log(value);
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
}
