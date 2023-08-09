import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-no-recipes',
  templateUrl: './no-recipes.component.html',
  styleUrls: ['./no-recipes.component.css']
})
export class NoRecipesComponent implements OnInit {
  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(private userService: UserService){}

  ngOnInit() {
   
    this.userSub = this.userService.user$$.subscribe(user => {
      this.isAuthenticated = !!user;
     
    });
  }
}
