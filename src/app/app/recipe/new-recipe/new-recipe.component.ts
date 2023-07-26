import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent {

  constructor(private apiService: ApiService){}

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
    this.apiService.addRecipe(f.value)
  }


}
