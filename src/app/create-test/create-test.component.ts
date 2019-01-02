import { Component, Input, OnInit } from '@angular/core';
import { Test } from '../_model/Test';
import { Question } from '../_model/Question';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import { CreateTestService } from '../_services/create-test.service';
import {Res} from '../_model/Res';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  questions: Question[];

  @Input() test = new Test();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private createTestService: CreateTestService,
  ) { }

  ngOnInit() {
    swal.close();
    const value = <Res>this.route.snapshot.data.DataValue;
    if (value.status) {
      const data = <Question[]>value.data;
      this.questions = data;
      for (let i = 0; i < this.questions.length; i++) {
        this.questions[i].content = this.questions[i].content.replace(/\n/g, '<br>');
      }
    } else {
      swal({
        title: 'Failed',
        html: value.message,
        type: 'error'
      });
    }
  }
  /*getTest(idSubject, idTestDetail) {
    this.test.idSubject = idSubject;
    this.test.idTestDetail = idTestDetail;
    this.test.idAccount = localStorage.getItem('idAccount');
    this.createTestService.beginTest(this.test).subscribe(
      value => {
        if (value.status) {
          this.questions = <Question[]>value.data;
          for (let i = 0; i < this.questions.length; i++) {
            this.questions[i].content = this.questions[i].content.replace(/\n/g, '<br>');
          }
          console.log(this.questions);
        } else {
          console.log(value);
        }
      }, error => {
        console.log(error);
      },
      () => {
        console.log('completed');
      });
  }*/

}
