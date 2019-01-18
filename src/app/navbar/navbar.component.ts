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
  username: string;
  IdRole: string;

  @Input() account = new Account();
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
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

    if (localStorage.getItem('token')) {
      // console.log(localStorage.getItem('token'));
      this.username = localStorage.getItem('username');
      this.IdRole = localStorage.getItem('IdRole');
      if (localStorage.getItem('pic') !== 'undefined') {
        document.getElementById('image2').setAttribute('src', 'data:image/png;base64,' + localStorage.getItem('pic'));
      }
    }

    setInterval(this.loginService.logout, 60000);
  }

  logout() {
    localStorage.clear();
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
    location.reload();
  }
}
