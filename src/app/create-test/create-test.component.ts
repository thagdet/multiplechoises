import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Question } from '../_model/Question';
import { FormBuilder, FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { CreateTestService } from '../_services/create-test.service';
import { Test } from '../_model/Test';
import { Dataservice } from '../list-test-detail/dataservice';
import { timer } from 'rxjs';
import { OuterSubscriber } from 'rxjs/internal/OuterSubscriber';

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
  duration: number;
  duration2: number;
  hours: string;
  minutes: string;
  seconds: string;
  flag = true;
  interval;
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
    swal({
      title: 'Are you sure?',
      html: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Submit!'
    }).then((result) => {
      if (result.value) {
        const data = {
          idTestDetail: this.test.idTestDetail,
          idClass: this.idClass,
          data: this.results,
          count: this.numberOfQuestion,
          timeComplete: this.duration2 - this.duration
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
                  document.getElementById(i + '_' + value.data.posts[i].selectedAnswer).style.color = 'Red';
                }
                document.getElementById(i + '_' + value.data.posts[i].correctAnswer).style.color = '#00ff00';
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
    });
  }

  check(index, idAnswer) {
    this.results[index].idAnswer = idAnswer;
    // console.log(this.results);
  }

  add(t: number) {
    if (t < 10) {
      return '0' + t;
    } else {
      return '' + t;
    }
  }

  getTest() {
    this.test.idAccount = localStorage.getItem('idAccount');
    this.createTestService.beginTest(this.test).subscribe(
      value => {
        swal.close();
        if (value.status) {
          // console.log(value);
          this.questions = <Question[]>value.data.questions;
          this.idClass = value.data.idClass;
          this.duration = value.data.duration * 60;
          this.duration2 = value.data.duration * 60;
          this.numberOfQuestion = this.questions.length;
          this.results = new Array(this.numberOfQuestion);
          for (let i = 0; i < this.questions.length; i++) {
            this.questions[i].content = this.questions[i].content.replace(/\n/g, '<br>');
            this.results[i] = {
              idQuestion: this.questions[i]._id,
              idAnswer: null,
            };
          }

          this.interval = setInterval(() => {
            if (this.duration > 0) {
              this.hours = this.add( Math.floor((this.duration % ( 60 * 60 * 24)) / ( 60 * 60)));
              this.minutes = this.add( Math.floor((this.duration % ( 60 * 60)) / ( 60)));
              this.seconds = this.add( Math.floor((this.duration % ( 60))));
              this.duration--;
            } else {
              this.onSubmitText();
              clearInterval(this.interval);
            }
          }, 1000);
          // document.getElementById('CountTime').style.display = '';
        } else {
          swal({
            title: 'Failed',
            html: value.message,
            type: 'error',
            showConfirmButton: false,
            timer: 2000
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
