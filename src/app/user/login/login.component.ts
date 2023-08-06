import { Component} from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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

  onSubmit(loginForm: NgForm): void {

    if (loginForm.invalid) {
      return;
    }

    const { email, password } = loginForm.value;
    // console.log(email, password);

    this.userService.login(email, password).subscribe(
      {
        next: (resData) => {

          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
          loginForm.reset()
          
        }, error: errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage
          this.isLoading = false;
        }
      });
      //todo reset
      

  }
}
