import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Category } from 'src/app/types/category';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe-categories',
  templateUrl: './recipe-categories.component.html',
  styleUrls: ['./recipe-categories.component.css']
})
export class RecipeCategoriesComponent implements OnInit {
  categoriesList: Category[] = [];
  isLoading: boolean = true;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadCategories()
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(
      {
        next: (categories) => {

          this.categoriesList = categories;

          this.isLoading = false

        },
        error: (err) => {
          this.isLoading = false
          console.log(`Error ${err}`);
        }
      }
    );
  }

}