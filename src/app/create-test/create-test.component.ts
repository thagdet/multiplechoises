import {Component, Input, OnInit, Renderer2} from '@angular/core';
import { Question } from '../_model/Question';
import {FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import { CreateTestService } from '../_services/create-test.service';
import {Test} from '../_model/Test';
import {Dataservice} from '../list-test-detail/dataservice';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  questions: Question[];
  numberOfQuestion: number;
  test = new Test();
  idClass: string;
  flag = true;
  results: {
    idQuestion: string,
    idAnswer: string,
  }[];

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private createTestService: CreateTestService,
    public dataService: Dataservice
  ) { }

  ngOnInit() {
    swal({
      imageUrl: '../../assets/images/loading3.gif',
      imageAlt: 'Loading ...',
      showConfirmButton: false
    });
    this.test.idSubject = this.dataService.idSubject;
    this.test.idTestDetail = this.dataService.idTestDetail;
    this.getTest();
  }

  onSubmitText() {
    const data = {
      idTestDetail: this.test.idTestDetail,
      idClass: this.idClass,
      data: this.results,
      count: this.numberOfQuestion
    };
    // console.log(data);
    swal({
      imageUrl: '../../assets/images/loading3.gif',
      imageAlt: 'Loading ...',
      showConfirmButton: false
    });
    this.createTestService.submitText(data).subscribe(
      value => {
        if (value.status) {
          this.flag = false;
          // console.log(value);
          swal({
            title: 'DONE',
            html: '<strong style="font-size: 16px">Your result: ' + value.data.mark + '</strong>',
            type: 'success'
          });
          for (let i = 0; i < value.data.posts.length; i++) {
            // console.log(i + '_' + val.correctAnswer);
            if (value.data.posts[i].selectedAnswer) {
              document.getElementById(i + '_' + value.data.posts[i].selectedAnswer ).style.color = 'Red';
            }
            document.getElementById(i + '_' + value.data.posts[i].correctAnswer ).style.color = '#00ff00';
          }
        } else {
          console.log(value);
        }
      }, error => {
        console.log(error);
      },
      () => {
        document.getElementById('SubmitButton').style.display = 'none';
        console.log('completed');
      });
  }

  check(index, idAnswer) {
    this.results[index].idAnswer = idAnswer;
    // console.log(this.results);
  }

  getTest() {
    this.test.idAccount = localStorage.getItem('idAccount');
    this.createTestService.beginTest(this.test).subscribe(
      value => {
        swal.close();
        if (value.status) {
          this.questions = <Question[]>value.data.questions;
          this.idClass = value.data.idClass;
          this.numberOfQuestion = this.questions.length;
          this.results = new Array(this.numberOfQuestion);
          for (let i = 0; i < this.questions.length; i++) {
            this.questions[i].content = this.questions[i].content.replace(/\n/g, '<br>');
            this.results[i] = {
              idQuestion: this.questions[i]._id,
              idAnswer: null,
            };
          }
        } else {
          swal({
            title: 'Failed',
            html: value.message,
            type: 'error'
          });
          console.log(value);
        }
      }, error => {
        console.log(error);
      },
      () => {
        console.log('completed');
      });
  }

}
