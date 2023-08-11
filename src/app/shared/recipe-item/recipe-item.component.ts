import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/types/recipe';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, OnDestroy {
  @Input() recipe: Recipe | undefined;
  isAuthenticated = false;
  private userSub!: Subscription;
  // @Input() id: string | undefined ;//take id form recipe._id
  constructor(private userService: UserService) { }

  ngOnInit() {

    // this.userService.user$$.subscribe(user => 
    // )

    this.userSub = this.userService.user$$.subscribe(user => {
      this.isAuthenticated = !!user;
      // this.username=user?.username
    })
  }
  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe()
    }
  }

}
