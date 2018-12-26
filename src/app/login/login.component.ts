import {Component, Input, OnInit} from '@angular/core';
import {Account} from '../_model/Account';
import {Login} from '../_model/login';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {LoginService} from '../_services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  validation_messages = {
    'username': [{type: 'required', message: 'Username is required'}],
    'password': [{type: 'required', message: 'Password is required'}],
  };

  @Input() account = new Account();
  constructor(private router: Router,
              private fb: FormBuilder,
              private loginService: LoginService,
              ) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.loginService.login(this.account).subscribe(
      value => {
        console.log(value);
        if (value !== undefined) {
          localStorage.setItem('token', value.token);
          localStorage.setItem('username', value.data.UserName);
          document.getElementById('closeLoginModal').click();
          swal({
            title: 'SUCCESS',
            html: 'Welcome',
            type: 'success'
          });
        } else {
          console.log('fault');
        }
      }, error => {
        console.log(error);
      },
      () => {
        console.log('completed');
      });
  }
}
