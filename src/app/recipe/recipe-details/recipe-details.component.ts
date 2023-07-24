import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent  {
  recipe: Recipe | undefined
  isLoading: boolean = true;

  id: string = '';


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
      this.id = params['recipeId'];

      this.apiService.getRecipe(this.id).subscribe(
        {
          next: (fetchedRecipe) => {
            this.recipe = fetchedRecipe;
            this.isLoading = false
            console.log(this.recipe);
          },
          error: (err) => {
            this.isLoading = false
            console.log(`Error ${err}`);

          }
        })

      // this.recipe = this.recipeService.getOneRecipe(this.id)
    })
  }
  // fetchRecipe(id:string ): void {
  //   // const id = this.activatedRoute.snapshot.params['recipeId'];
  //   this.apiService.getRecipe(id).subscribe(
  //     {
  //       next: (fetchedRecipe) => {
  //         this.recipe = fetchedRecipe;
  //         this.isLoading = false
  //         console.log(this.recipe);
  //       },
  //       error: (err) => {
  //         this.isLoading = false
  //         console.log(`Error ${err}`);

  //       }
  //     }
  //   )
  // }


}
