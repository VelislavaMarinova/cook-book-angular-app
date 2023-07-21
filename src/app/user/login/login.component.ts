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

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  @ViewChild('f') loginForm: NgForm | undefined 


  // constructor(private user: User){}
  user = {
    password: '',
    email: '',
    
  }
  // user: User |  undefined

  onSubmit() {
    this.user.password = this.loginForm?.value.password;
    this.user.email = this.loginForm?.value.email;

    console.log(this.user);
    // console.log('submited');
    

  }
  login(email: string, password: string): void {
    this.userService.login();
    this.router.navigate(['/'])

  }
}
