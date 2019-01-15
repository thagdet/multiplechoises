import { Component, OnInit } from '@angular/core';
import {User} from '../_model/User';
import {UserService} from '../_services/user.service';
import {Account} from '../_model/Account';
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private user: User;
  private ifUpdate = false;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    localStorage.getItem('token') ?
      this.onLoad() :
      document.getElementById('loginClick').click();
  }

  onLoad() {
    this.userService.getUser(localStorage.getItem('idAccount')).subscribe(
      value => {
        if (value.status) {
          // console.log(value);
          this.user = <User>value.data;
          if (localStorage.getItem('pic') !== 'undefined') {
            document.getElementById('image3').setAttribute('src', 'data:image/png;base64,' + localStorage.getItem('pic'));
          }
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

  onUpdateUser() {
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
        this.ifUpdate = false;
        // console.log(this.user);
        this.userService.updateUser(this.user).subscribe(
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

  onFileChange(event) {
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
        const reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
          const file = event.target.files[0];
          reader.readAsDataURL(file);
          reader.onload = () => {
            // console.log(reader.result);
            const code = reader.result.toString().split(',')[1];
            this.user.profilePicture = code.toString();
            // console.log(this.user);
            this.userService.updateUser(this.user).subscribe(
              value => {
                if (value.status) {
                  localStorage.setItem('pic', this.user.profilePicture);
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
            document.getElementById('image2').setAttribute('src', 'data:image/png;base64,' + code);
          };
        }
      }
    });
  }

}
