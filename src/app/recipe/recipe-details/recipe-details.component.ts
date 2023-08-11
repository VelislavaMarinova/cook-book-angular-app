import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  recipe: Recipe | undefined
  isLoading: boolean = true;


  isAuthenticated = false;
  private userSub!: Subscription;
  username: string | undefined;
  isOwner: boolean = false

  id: string = '';


  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.userSub = this.userService.user$$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.username = user?.username;
    });

    this.loadData();
    
  }

  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {

      this.id = params['recipeId'];

      this.apiService.getRecipe(this.id).subscribe(
        {
          next: (fetchedRecipe) => {
            this.recipe = fetchedRecipe;
            this.isLoading = false
            if(this.recipe.author===this.username){
              this.isOwner=true;
            }
          },
          error: (err) => {
            this.isLoading = false
            console.log(`Error ${err}`);

          }
        })
    })
  }

  openModal(){
    
  }
}
