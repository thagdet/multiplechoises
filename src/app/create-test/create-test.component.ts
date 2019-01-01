import { Component, Input, OnInit } from '@angular/core';
import { Test } from '../_model/Test';
import { Question } from '../_model/Question';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import { CreateTestService } from '../_services/create-test.service';

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
    this.questions = <Question[]>this.route.snapshot.data.DataValue.data;
  }
  /*getTest(idSubject, idTestDetail) {
    this.test.idSubject = idSubject;
    this.test.idTestDetail = idTestDetail;
    this.test.idAccount = localStorage.getItem('idAccount');
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
  }*/

}
