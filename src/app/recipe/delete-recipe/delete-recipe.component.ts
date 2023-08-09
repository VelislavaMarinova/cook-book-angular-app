import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrls: ['./delete-recipe.component.css']
})
export class DeleteRecipeComponent implements OnInit {
  recipeId: string | undefined;
  recipe: Recipe | undefined;
  isLoading: boolean = false;
  error: string | undefined;


  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this.isLoading = true;
    this.activatedRoute.params.subscribe((params: Params) => {

      this.recipeId = params['recipeId'];

      this.apiService.getRecipe(this.recipeId!).subscribe(
        {
          next: (fetchedRecipe) => {
            this.recipe = fetchedRecipe;
            console.log(this.recipe);

            this.isLoading = false


          },
          error: errorMessage => {
            this.error = errorMessage;
            this.isLoading = false;
          }
        })
    })
  }
  onDelete() {
    this.apiService.deleteRecipe(this.recipeId!).subscribe();
    this.router.navigate([`/recipes`]);
    
  }
}
