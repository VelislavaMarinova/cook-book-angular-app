import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
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
  isEditMode: boolean = false;

  id: string = '';


  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  //use isLogged for logic in detailsPage
  // get isLogged(): boolean {
  //   return this.userService.isLogged
  // }

  ngOnInit(): void {
    this.loadData()
    // this.fetchRecipe();


  }
  loadData() {
    this.activatedRoute.params.subscribe((params: Params) => {

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
    })
  }
  onEditRecipe(recipeId: string): void {


   
  }

}
