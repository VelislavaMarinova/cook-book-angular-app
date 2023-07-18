import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';


const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesListComponent
  },
  {
    path: 'add-recipe',
    component: NewRecipeComponent
    
  },
  // {
  //   path: 'profile',
 
    
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }