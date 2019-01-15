import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../_services/account.service';
import swal from 'sweetalert2';
import {Account} from '../_model/Account';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../_services/login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  formRegister: FormGroup;
  private accounts: Account[];

  validation_messages = {
    'username': [{type: 'required', message: 'Username is required'}],
    'password': [{type: 'required', message: 'Password is required'}],
    'idRole': [{type: 'required', message: 'Id Role is required'}],
  };

  @Input() account = new Account();
  constructor(
    private loginService: LoginService,
    private accountService: AccountService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.formRegister = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      idRole: new FormControl('', [Validators.required]),
    });

    this.onLoad();
  }

  onLoad() {
    this.accountService.getAllAccount().subscribe(
      value => {
        if (value.status) {
          this.accounts = <Account[]>value.data;
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

  getInforAccount(i: string) {
    this.account = this.accounts[i];
    delete this.account.__v;
  }

  OnSubmitUpdateAccount() {
    // console.log(this.account);
    swal({
      title: 'Are you sure?',
      html: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        document.getElementById('closeCreateQuestionModal').click();
        this.accountService.updateAccount(this.account).subscribe(
          value => {
            if (value.status) {
              swal({
                title: 'UPDATED',
                html: value.message,
                type: 'success',
                timer: 2000
              });
              this.onLoad();
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
    });
  }

  OnSubmitRegister() {
    // console.log(this.account);
    this.loginService.register(this.account).subscribe(
      value => {
        console.log(value);
        if (value.status) {
          const data = <Account>value.data;
          swal({
            title: 'SUCCESS',
            html: value.message,
            type: 'success',
            timer: 2000
          });
          this.onLoad();
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

  onDelete(id) {
    swal({
      title: 'Are you sure?',
      html: 'You wont be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        // console.log(id);
        this.accountService.deleteAccount(id).subscribe(
          value => {
            if (value.status) {
              swal({
                title: 'SUCCESS',
                html: value.message,
                type: 'success'
              });
              this.onLoad();
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
    });
  }
}
