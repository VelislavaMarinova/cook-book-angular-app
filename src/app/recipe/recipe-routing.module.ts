import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AuthGuard } from '../core/guards/authGuard';


const routes: Routes = [
  {
    path: 'recipes',
    children:[
      {
        path:'',
        pathMatch: 'full',
        component: RecipesListComponent
      },
      {
        path: ':recipeId',
        component: RecipeDetailsComponent
      }
    ]
  },
  {
    path: 'add-recipe',
    component: NewRecipeComponent,
    canActivate: [AuthGuard]
    
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