import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
constructor(private userService: UserService){}
  title = 'cook-book';
  ngOnInit(): void {
    this.userService.aoutoLogin();
  }
}
