import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { imageUrlValidator } from '../shared/validators/url-validator';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/types/recipe';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  isLoading: boolean = false;
  error: string | undefined;
  recipe: Recipe | undefined;
  categoriesList: string[] = [];



  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  createForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl('', [Validators.required]),
      'category': new FormControl('drinks', [Validators.required]),
      'dificulty': new FormControl('easy', [Validators.required]),
      'prepare': new FormControl('', [Validators.required]),
      'cook': new FormControl('', [Validators.required]),
      'serves': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'ingredients': new FormArray([
        new FormGroup({
          'ingredient': new FormControl('', [Validators.required]),
        })
      ]),
      'imageUrl': new FormControl('', [Validators.required, imageUrlValidator()]),
      'method': new FormArray([
        new FormGroup({
          'step': new FormControl('', [Validators.required]),
        })
      ]),
    });
  };

  get ingredientsFormArray(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  };

  get methodFormArray(): FormArray {
    return this.recipeForm.get('method') as FormArray;
  };

  ngOnInit(): void {
    this.createForm()
    this.loadCategories()
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(
      {
        next: (categories) => {
          categories.forEach(cat => {
            this.categoriesList.push(cat.catName)
          })

          this.isLoading = false

        },
        error: (err) => {
          this.isLoading = false
          console.log(`Error ${err}`);
        }
      }
    );
  }


  onSubmit() {
    if (!this.recipeForm.valid) {
      return
    }
    this.isLoading = true
    const ingredients: string[] = [];
    const method: string[] = [];


    this.recipeForm.value.ingredients.forEach((element: { ingredient: string; }) => {
      ingredients.push(element.ingredient)
    });
    this.recipeForm.value.method.forEach((element: { step: string; }) => {
      method.push(element.step)
    });

    if (ingredients.length === 0) {
      this.error = 'Method is required!'
      throw new Error('Ingredients are required!')
    } else if (method.length === 0) {
      this.error = 'Method is required!'
      throw new Error('Method is required!')
    }

    this.recipeForm.value.method = method
    this.recipeForm.value.ingredients = ingredients


    this.apiService.addRecipe(this.recipeForm.value).subscribe(
      {
        next: (response) => {
          this.isLoading = false,
            this.recipe = response;
          this.router.navigate([`/recipes/${this.recipe?.category}/details/${this.recipe?._id}`]);
        },
        error: errorMessage => {
          this.error = errorMessage.error.message;
          this.isLoading = false;
        }

      })
    this.recipeForm.reset();
  }
  onAddIngredient() {
    const control = (<FormArray>this.recipeForm.controls['ingredients']);

    control.push(
      new FormGroup({
        ingredient: new FormControl('', [Validators.required]),
      })
    )
  };

  onRemoveIngredient(index: number) {
    const control = (<FormArray>this.recipeForm.controls['ingredients']);
    control.removeAt(index)

  }

  onAddStep() {
    const control = (<FormArray>this.recipeForm.controls['method']);

    control.push(
      new FormGroup({
        step: new FormControl('', [Validators.required]),
      })
    )
  };

  onRemoveStep(index: number) {
    const control = (<FormArray>this.recipeForm.controls['method']);
    control.removeAt(index)

  }


}
