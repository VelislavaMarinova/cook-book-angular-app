import { Component, OnInit, OnChanges } from '@angular/core';
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

  numRecipesPerPage: number = 6;
  numLoadedRecipes: number = 0;
  loadMore: boolean = true;
  recipesToLoad: Recipe[] = [];

  constructor(

    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) { }

  //use isLogged for logic in detailsPage
  // get isLogged(): boolean {
  //   return this.userService.isLogged
  // }

  ngOnInit(): void {
    console.log(this.recipesToLoad, 'recipesToLoad-1');


    this.loadData()

  }

  loadData() {
    console.log(this.recipesToLoad, "recipesToLoad-2");

    this.activatedRoute.params.subscribe((params: Params) => {
      //from params id comes as a string, so it is need to be cast to number
      this.category = params['category'];
      this.numLoadedRecipes = 0;
      this.isLoading = true;
      this.noRecipesInTheList = false;


      this.apiService.getRecipesByCategory(this.category!).subscribe(
        {
          next: (result) => {
            this.recipes = result;
            if (this.recipes.length === 0) {
              this.noRecipesInTheList = true;
              this.recipesToLoad = [];
            } else {
              this.recipesToLoad = this.recipes.slice(0, this.numRecipesPerPage);
              this.numLoadedRecipes = this.recipesToLoad.length;

              if (this.recipes.length <= this.numRecipesPerPage) {
                this.loadMore = false;
              } else {
                this.loadMore = true;
              }
            }

            console.log(this.recipesToLoad, "recipesToLoad-3");

            this.isLoading = false;

          },
          error: (err) => {
            this.isLoading = false
            console.log(`Error ${err}`);
          }
        })

    })
  }
  onLoadMore() {

    this.recipesToLoad = this.recipes!.slice(0, this.numLoadedRecipes + this.numRecipesPerPage)
    this.numLoadedRecipes = this.recipesToLoad.length;

    if (this.numLoadedRecipes === this.recipes?.length) {
      this.loadMore = false;
    }

  }
}
