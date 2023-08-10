import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/types/recipe';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe | undefined;
   isAuthenticated = false;
  private userSub!: Subscription;
  // @Input() id: string | undefined ;//take id form recipe._id
  constructor(private userService: UserService){}

  ngOnInit() {
  
    console.log(this.recipe?.title,"item");
    this.userService.user$$.subscribe(user => console.log(user)
    )

    this.userSub = this.userService.user$$.subscribe(user => {
      this.isAuthenticated = !!user;
      // this.username=user?.username
  })
}
  
  
}
