import { Component, OnInit } from '@angular/core';
import {Question} from '../_model/Question';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../_services/question.service';
import {TestDetail} from '../_model/TestDetail';
import swal from 'sweetalert2';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions: Question[];
  private index = 0;
  private idSubject: string;
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idSubject = params['idSubject'];
    });
    this.Onload();
  }

  Onload() {
    this.questionService.GetAllQuestionByIdSubject(this.idSubject).subscribe(
      value => {
        // console.log(value);
        if (value.status) {
          const data = <Question[]>value.data;
          this.questions = data;
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
