import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../_model/Question';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../_services/question.service';
import swal from 'sweetalert2';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Answer} from '../_model/Answer';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions: Question[];
  formCreateQuestion: FormGroup;
  private newQuestions: Question[] = [];
  private newQuestion: Question;
  private idSubject: string;
  private sub: any;
  private idTestDetail: string;

  validation_messages = {
    'content': [{type: 'required', message: 'Content is required'}],
    'contentAnswer': [{type: 'required', message: 'Answer is required'}],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private questionService: QuestionService
  ) {
    this.newQuestion = new Question();
    this.newQuestion.content = '';
    this.newQuestion.listIdAnswer = [new Answer(), new Answer(), new Answer(), new Answer()];
  }

  ngOnInit() {
    this.formCreateQuestion = this.fb.group({
      content: new FormControl('', [Validators.required]),
      contentAnswer0: new FormControl('', [Validators.required]),
      contentAnswer1: new FormControl('', [Validators.required]),
      contentAnswer2: new FormControl('', [Validators.required]),
      contentAnswer3: new FormControl('', [Validators.required]),
      });
    if (this.router.url === '/TestDetail/Detail') {
      this.OnLoadWithIDTestDetail();
    } else {
      this.sub = this.route.params.subscribe(params => {
        this.idSubject = params['idSubject'];
      });
      this.OnLoadWithIDSubject();
    }
  }

  getIdTestDetail(idTestDetail) {
    this.idTestDetail = idTestDetail;
  }

  OnLoadWithIDTestDetail() {
    this.questionService.GetAllQuestionByIdSubject(this.idTestDetail).subscribe(
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

  OnLoadWithIDSubject() {
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

  UpdateQuestion(question) {
    this.questionService.UpdateQuestion(question).subscribe(
      value => {
        // console.log(value);
        if (value.status) {
          swal({
            title: 'SUCCESS',
            html: value.message,
            type: 'success'
          });
          this.OnLoadWithIDSubject();
          // location.reload();
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

  addNewQuestion() {
    this.newQuestions.push(this.newQuestion);
    this.newQuestion = new Question();
    this.newQuestion.content = '';
    this.newQuestion.listIdAnswer = [new Answer(), new Answer(), new Answer(), new Answer()];
  }

  DeleteNewQuestion(index) {
    // console.log(index);
    this.newQuestions.splice(index, 1);
  }

  OnSubmitAddNewQuestion() {
    this.newQuestions.push(this.newQuestion);
    const sender = {
      questions: this.newQuestions,
      idSubject: this.idSubject,
    };
    this.questionService.CreateQuestion(sender).subscribe(
      value => {
        // console.log(value);
        if (value.status) {
          /*this.newQuestions = [];
          this.newQuestion.content = '';
          this.newQuestion.listIdAnswer = [new Answer(), new Answer(), new Answer(), new Answer()];
          this.Onload();*/
          document.getElementById('closeCreateQuestionModal').click();
          swal({
            title: 'SUCCESS',
            html: value.message,
            type: 'success'
          });
          location.reload();
        } else {
          this.newQuestions.splice(this.newQuestions.length - 1, 1);
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

  DeleteQuestion(id) {
    this.questionService.DeleteQuestion(id).subscribe(
      value => {
        // console.log(value);
        if (value.status) {
          swal({
            title: 'SUCCESS',
            html: value.message,
            type: 'success'
          });
          this.OnLoadWithIDSubject();
          // location.reload();
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
