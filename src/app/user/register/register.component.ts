import { Component} from '@angular/core';
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

  isLoading = false;
  error: string | undefined;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  onSubmit(registerForm:NgForm) {
    if (registerForm.invalid) {
      return;
    }

    const { username, email, password, rePass } = registerForm.value;

    if (password !== rePass) {
      this.error = 'Passwords don`t match';
      return;
    }

    this.isLoading = true;
    console.log(registerForm.value);
    this.userService.register(username, email, password).subscribe(
      {
        next: (resData) => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
          registerForm.resetForm();

        }, error: errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      })
  }
 
}
