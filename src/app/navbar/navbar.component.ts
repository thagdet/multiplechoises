import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

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
  }

}
