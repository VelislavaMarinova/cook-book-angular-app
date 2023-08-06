import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Recipe } from '../types/recipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipeList: Recipe[] = [];
  isLoading: boolean = true;
  noRecipesInTheList: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.onFetchRecipes()
  }
  onFetchRecipes() {
    this.apiService.getRecipesByLimit().subscribe(
      {
        next: (recipes) => {

          this.recipeList = recipes;

          if (this.recipeList.length === 0) {
            this.noRecipesInTheList = true;
          }

          this.isLoading = false
        },
        error: (err) => {
          this.isLoading = false
          console.log(`Error ${err.message}`);

        }
      })
  }
}
