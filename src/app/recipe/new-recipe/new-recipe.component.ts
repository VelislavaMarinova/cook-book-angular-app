import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { imageUrlValidator } from '../validators';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  isLoading: boolean = false;
  error: string | undefined

  constructor(
    private apiService: ApiService,
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
  }

  onSubmit() {
    if (!this.recipeForm.valid) {
      return
    }
    this.isLoading=true
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
          this.isLoading = false
        },
        error: errorMessage => {
          this.error = errorMessage.error.message;
          this.isLoading = false;
        }

      })
      this.recipeForm.reset();
    //   response => {
    //   console.log(response);
    // });

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
