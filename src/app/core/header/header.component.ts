import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;
  username: string | undefined;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit() {
    console.log(this.userService.user$$, "HeaderComponent");
    this.userService.user$$.subscribe(user => console.log(user)
    )

    this.userSub = this.userService.user$$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.username=user?.username
      console.log(user,'header');
      
      console.log(user?.username, 'user');
      console.log(!!user);
    });
  }

  // get isLoggedIn(): boolean {
  //   return this.userService.isLogged
  // }

  // get username(): string {
  //   return this.userService.user?.username || '';
  // }

  onLogout(): void {
    this.userService.logout();
  }

  ngOnDestroy(): void {

  }
}
