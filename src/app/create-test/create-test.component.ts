import { Component, Input, OnInit } from '@angular/core';
import { Test } from '../_model/Test';
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

  @Input() test = new Test();
  constructor(private router: Router,
    private fb: FormBuilder,
    private createTestService: CreateTestService,
  ) { }

  ngOnInit() {
    this.getTest() 
  }
  getTest() {
    this.createTestService.beginTest(this.test).subscribe(
      value => {
        if (value.status) {
          console.log('a');
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
