import { Component, Input } from '@angular/core';
import {  Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrls: ['./delete-recipe.component.css']
})
export class DeleteRecipeComponent {
@Input() recipeId: string | undefined;
@Input() recipeTitle: string | undefined

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  onDelete() {
    this.apiService.deleteRecipe(this.recipeId!).subscribe();
    this.router.navigate([`/recipes`]);
  }

}
