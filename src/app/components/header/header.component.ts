import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  formAuthModel = {
    UserName: '',
    Password: ''
  }

  isAuth: any = localStorage.getItem('token');

  constructor(public service: AuthService, private toastr: ToastrService, private router: Router) { }

  onRegisterSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res.succeeded) {
          this.service.formRegisterModel.reset();
          this.toastr.success('User created.', 'Successful register');
        } else {
          res.errors.forEach((element: any) => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('User already exists.', 'Registration error');
                break;

              default:
                this.toastr.error(element.description, 'Registration error');
                break;
            }
          });
        }
      },
      (err: any) => {
        if (err.status == 400)
          this.toastr.error('Check the data.', 'Registration error');
        else
          console.log(err);
      }
    );
  }

  onAuthSubmit(form: NgForm) {
    this.service.login(form.value).subscribe(
      (res: any) => {
        this.toastr.success('Successful authorization', 'Successful authorization');
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/profile');
        setTimeout(() =>  window.location.reload(), 1000);
      },
      (err: any) => {
        if (err.status == 400)
          this.toastr.error('Wrong login or password.', 'Authorisation Error');
        else
          console.log(err);
      }
    );
  }

  ngOnInit(): void {}

  onLogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    window.location.reload();
  }

  showFunction() {
    document.getElementById("account-dropdown")!.classList.toggle("show");

    window.onclick = (event: any) => {
      if (!event.target?.matches('.account')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
  }
}