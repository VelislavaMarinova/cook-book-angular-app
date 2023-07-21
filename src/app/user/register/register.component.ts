import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('f') registerForm: NgForm | undefined 

  genders = ['male', 'female'];
  // constructor(private user: User){}
  user: User = {
    username: '',
    email: '',
    gender: '',
  }
  // user: User |  undefined

  onSubmit() {
    this.user.username = this.registerForm?.value.username;
    this.user.email = this.registerForm?.value.email;
    this.user.gender = this.registerForm?.value.gender;

    console.log(this.user);
    // console.log('submited');
    

  }
}
