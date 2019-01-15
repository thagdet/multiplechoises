import { Component, OnInit } from '@angular/core';
import {Subject} from '../_model/Subject';
import swal from "sweetalert2";
import {ClassOfAccountService} from '../_services/class-of-account.service';
import {TestService} from '../_services/test.service';
import {Test} from '../_model/Test';
import {Classes} from '../_model/Classes';

@Component({
  selector: 'app-history-test',
  templateUrl: './history-test.component.html',
  styleUrls: ['./history-test.component.css']
})
export class HistoryTestComponent implements OnInit {
  private classOfAccount: Subject[];
  private tests: Test[];
  protected classes: Classes[];
  constructor(
    private classOfAccountService: ClassOfAccountService,
    private testService: TestService,
  ) { }

  ngOnInit() {
    this.testService.GetAllTestByIdAccount(localStorage.getItem('idAccount')).subscribe(
      value => {
        // console.log(value);
        if (value.status) {
          this.classes = value.data.class;
          this.tests = value.data.posts;
          for ( let i = 0; i < this.classes.length; i++) {
              this.classes[i]['listTest'] = this.tests[i];
              this.classes[i]['status'] = '' + 0 + ' / ' + 0;
          }
          // console.log(this.classes);
        } else {
          console.log('fault');
          swal({
            title: 'Failed',
            html: value.message,
            type: 'error',
            showConfirmButton: false,
            timer: 2000
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
