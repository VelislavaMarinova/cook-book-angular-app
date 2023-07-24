import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent {

  onSubmit(f:NgForm) {
    if (f.invalid) {
      return;
    }
    console.log(f.value);
    
    const {
      title,
      category,
      dificulty,
      prepare,
      cook,
      serves,
      description,
      ingredients,
      imageUrl,
      method
    } = f.value;
  }

}
