import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit{
  recipe: Recipe | undefined

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  //use isLogged for logic in detailsPage
  get isLogged(): boolean {
    return this.userService.isLogged
  }

  ngOnInit(): void {
    this.fetchRecipe();
  }
  fetchRecipe(): void {
    const id = this.activatedRoute.snapshot.params['recipeId'];
    this.apiService.getRecipe(id).subscribe((fetchedRecipe) => {
      this.recipe = fetchedRecipe;
      console.log(id);
      
      console.log(this.recipe);
      
    })
  }


}
