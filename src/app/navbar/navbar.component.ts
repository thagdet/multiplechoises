import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Account} from '../_model/Account';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import swal from "sweetalert2";
import {LoginService} from '../_services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  formRegister: FormGroup;

  validation_messages = {
    'username': [{type: 'required', message: 'Username is required'}],
    'password': [{type: 'required', message: 'Password is required'}],
  };

  username: string;
  IdRole: string;

  @Input() account = new Account();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.formRegister = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    window.onscroll = function () { myFunction(); };

    const navbar = document.getElementById('hd');
    const sticky = navbar.offsetTop;

    function myFunction() {
      if (window.pageYOffset > sticky) {
        navbar.classList.add('scroll-sticky');
      } else {
        navbar.classList.remove('scroll-sticky');
      }
    }

    if (localStorage.getItem('token') !== undefined) {
      this.username = localStorage.getItem('username');
      this.IdRole = localStorage.getItem('IdRole');
    }
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
            type: 'success'
          });
          location.reload();
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

  logout() {
    localStorage.clear();
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
    location.reload();
  }
}
