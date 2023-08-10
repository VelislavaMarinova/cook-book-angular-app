import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Recipe } from 'src/app/types/recipe';
import { imageUrlValidator } from '../validators';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  isLoading: boolean = false;
  recipe: Recipe | undefined
  isEditMode: boolean = false;
  id: string = '';
  error: string | undefined;



  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
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
    this.createForm();
    this.loadData();
  }

  loadData() {
    this.isLoading = true
    this.activatedRoute.params.subscribe((params: Params) => {

      this.id = params['recipeId'];

      this.apiService.getRecipe(this.id).subscribe(
        {
          next: (fetchedRecipe) => {
            this.recipe = fetchedRecipe;
            console.log(this.recipe);

            this.isLoading = false

            this.recipeForm.patchValue({
              title: this.recipe.title,
              category: this.recipe.category,
              dificulty: this.recipe.dificulty,
              prepare: this.recipe.prepare,
              cook: this.recipe.cook,
              serves: this.recipe.serves,
              description: this.recipe.description,
              imageUrl: this.recipe.imageUrl,
            });

            
            this.ingredientsFormArray.clear();
            this.methodFormArray.clear();

          
            for (const ingredient of this.recipe.ingredients) {
              this.onAddIngredient(ingredient);
            }

            for (const step of this.recipe.method) {
              this.onAddStep(step);
            }
          },
          error: errorMessage => {
            this.error = errorMessage;
            this.isLoading = false;
          }
        })
    })
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
      this.error = 'Ingredients are required!'
      throw new Error('Ingredients are required!')
    } else if (method.length === 0) {
      this.error = 'Method is required!'
      throw new Error('Method is required!')
    }

    this.recipeForm.value.method = method
    this.recipeForm.value.ingredients = ingredients

    console.log(this.recipeForm.value, 'recipeForm');

    this.apiService.editRecipe(this.recipeForm.value, this.id).subscribe(
      {
        next: (response) => {
          this.isLoading = false;
          console.log(response);

          this.router.navigate([`/recipes/${this.recipe?.category}/details/${this.recipe?._id}`]);
        },
        error: errorMessage => {
          this.error = errorMessage.error.message;
          this.isLoading = false;
        }

      })
  }
  onAddIngredient(ingredient?: string) {
    const control = (<FormArray>this.recipeForm.controls['ingredients']);

    control.push(
      new FormGroup({
        ingredient: new FormControl(ingredient || '', [Validators.required]),
      })
    )
  };

  onRemoveIngredient(index: number) {
    const control = (<FormArray>this.recipeForm.controls['ingredients']);
    control.removeAt(index)

  }

  onAddStep(step?: string) {
    const control = (<FormArray>this.recipeForm.controls['method']);

    control.push(
      new FormGroup({
        step: new FormControl(step || '', [Validators.required]),
      })
    )
  };

  onRemoveStep(index: number) {
    const control = (<FormArray>this.recipeForm.controls['method']);
    control.removeAt(index);

  }

}

