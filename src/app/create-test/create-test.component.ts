import { Component, Input, OnInit } from '@angular/core';
import { Test } from '../_model/Test';
import { Question } from '../_model/Question';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { CreateTestService } from '../_services/create-test.service';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  formLogin: FormGroup;
  questions: Question[] = [];

  @Input() test = new Test();
  constructor(private router: Router,
    private fb: FormBuilder,
    private createTestService: CreateTestService,
  ) { }

  ngOnInit() {
  }
  getTest(idAccount, idSubject) {
    this.test.idClass = '5bf958072fa5eb302cb11ab5';
    this.test.idTestDetail = '5bf96eb097ca28269c307669';
    console.log(this.test)
    this.createTestService.beginTest(this.test).subscribe(
      value => {
        if (value.status) {
          const data = <Question[]>value.data;
          this.questions = data;
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
  }
}
