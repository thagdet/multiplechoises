import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string;
  constructor(
    private router: Router,
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

    if (localStorage.getItem('token') !== undefined) {
      this.username = localStorage.getItem('username');
    }
  }
  logout() {
    localStorage.clear();
    if (this.router.url !== '/') {
      this.router.navigate(['/']);
    }
    location.reload();
  }
}
