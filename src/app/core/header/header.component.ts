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

    this.userSub = this.userService.user$$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.username = user?.username;
    });
  }

  onLogout(): void {
    this.userService.logout();
  }

  ngOnDestroy(): void {

  }
}
