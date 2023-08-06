import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe-list-by-category',
  templateUrl: './recipe-list-by-category.component.html',
  styleUrls: ['./recipe-list-by-category.component.css']
})
export class RecipeListByCategoryComponent implements OnInit {
  recipes: Recipe[] | undefined
  isLoading: boolean = true;
  noRecipesInTheList: boolean = false;
  category: string | undefined;


  constructor(
    
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  //use isLogged for logic in detailsPage
  // get isLogged(): boolean {
  //   return this.userService.isLogged
  // }

  ngOnInit(): void {
    this.isLoading = true;
    this.noRecipesInTheList=false;
   
    
    this.activatedRoute.params.subscribe((params: Params) => {
      //from params id comes as a string, so it is need to be cast to number
      this.category = params['category'];

      this.apiService.getRecipesByCategory(this.category!).subscribe(
        {
          next: (recipes) => {
            this.recipes = recipes;
            this.isLoading = false;
            
            
            if (!this.recipes.length) {
              this.noRecipesInTheList = true;
            }
            // this.recipes.filter(r=>r.category === this.category)
          },
          error: (err) => {
            this.isLoading = false
            console.log(`Error ${err}`);
          }
        })


      // this.recipe = this.recipeService.getOneRecipe(this.id)
    })
  }
}
