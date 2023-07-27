import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  isLoading: boolean = false

  constructor(private apiService: ApiService) { }

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
      'imageUrl': new FormControl('', [Validators.required]),
      'method': new FormArray([
        new FormGroup({
          'step': new FormControl('', [Validators.required]),
        })
      ]),
    });
  };

  get ingredientsFormArray(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  get methodFormArray(): FormArray {
    return this.recipeForm.get('method') as FormArray;
  }

  ngOnInit(): void {
    this.createForm()
  }

  onSubmit() {
    this.isLoading=true
    const ingredients: string[] = [];
    const method: string[] = [];


    this.recipeForm.value.ingredients.forEach((element: { ingredient: string; }) => {
      ingredients.push(element.ingredient)
    });
    this.recipeForm.value.method.forEach((element: { step: string; }) => {
      method.push(element.step)
    });
    
    this.recipeForm.value.method = method
    this.recipeForm.value.ingredients = ingredients
   
    
    this.apiService.addRecipe(this.recipeForm.value).subscribe(
      {
        next: (response) => {
          this.isLoading = false
        },
        error: (err) => {
          this.isLoading = false
          console.log(`Error ${err}`);

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

  onAddAStep() {
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
