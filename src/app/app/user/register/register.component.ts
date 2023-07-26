import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { User } from 'src/app/types/user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('f') registerForm: NgForm | undefined

  isLoading = false;
  error: string | undefined;

  // genders = ['male', 'female'];

  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  onSubmit() {
    if (this.registerForm?.invalid) {
      return;
    }

    const { username, email, password, rePass } = this.registerForm?.value
    this.isLoading = true;
    console.log(this.registerForm?.value);
    this.userService.register(username, email, password).subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])

      },
      errorMessage => {

        console.log(errorMessage);
        this.error = errorMessage
        this.isLoading = false;
      })
    this.registerForm?.reset()
    // console.log('submited');

  }
}
