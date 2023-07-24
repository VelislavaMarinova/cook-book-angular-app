import { Component, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoading = false;
  error: string | undefined;


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  // @ViewChild('f') loginForm: NgForm | undefined 


  // constructor(private user: User){}
  user = {
    password: '',
    email: '',

  }
  // user: User |  undefined

  // onSubmit() {
  //   this.user.password = this.loginForm?.value.password;
  //   this.user.email = this.loginForm?.value.email;

  //   console.log(this.user);
  //   // console.log('submited');


  // }
  onSubmit(f: NgForm): void {
    if (f.invalid) {
      return;
    }
    const { email, password } = f.value;
    console.log(email, password);

    this.userService.login(email, password).subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      errorMessage => {

        console.log(errorMessage);
        this.error = errorMessage
        this.isLoading = false;
      });
    // f.value?.reset()

  }
}
