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

  onSubmit(f: NgForm): void {
    if (f.invalid) {
      return;
    }
    const { email, password } = f.value;
    console.log(email, password);

    this.userService.login(email, password).subscribe(
      {
        next: (resData) => {

          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
          
        }, error: errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage
          this.isLoading = false;
        }
      });
      //todo reset
      f.value?.reset()

  }
}
