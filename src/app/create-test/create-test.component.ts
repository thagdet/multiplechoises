import { Component, Input, OnInit } from '@angular/core';
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
  results: {
    idQuestion: string,
    idAnswer: string,
  }[];

  constructor(
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
          console.log(value)
          let i = 0;
          for (const val of value.data.posts) {
            console.log(i + '_' + val.correctAnswer);
            document.getElementById(i + '_' + val.correctAnswer ).style.color = '#00ff00';
            i++;
          }
        } else {
          console.log(value);
        }
      }, error => {
        console.log(error);
      },
      () => {
        swal.close();
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
          this.questions = <Question[]>value.data;
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
