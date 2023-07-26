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

  category: string = '';


  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  //use isLogged for logic in detailsPage
  // get isLogged(): boolean {
  //   return this.userService.isLogged
  // }

  ngOnInit(): void {

    // this.fetchRecipe();

    this.activatedRoute.params.subscribe((params: Params) => {
      //from params id comes as a string, so it is need to be cast to number
      this.category = params['category'];

      this.apiService.getRecipes().subscribe(
        {
          next: (recipes) => {
            this.recipes = recipes.filter(r=>r.category === this.category);
            this.isLoading = false
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
