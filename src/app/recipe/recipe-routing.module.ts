import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesMainComponent } from './recipes-main/recipes-main.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeListByCategoryComponent } from './recipe-list-by-category/recipe-list-by-category.component';
import { AuthGuard } from '../core/guards/authGuard';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';


const routes: Routes = [
  {
    path: '',

    component: RecipesMainComponent,

    children: [
      {
        path: '',
        pathMatch: "full",
        component: RecipeStartComponent
      }, {
        path: ':category',
        component: RecipeListByCategoryComponent,
      },
      {
        path: ':category/details/:recipeId',
        component: RecipeDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':category/edit/:recipeId',
        component: EditRecipeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':category/delete/:recipeId',
        component: DeleteRecipeComponent,
        canActivate: [AuthGuard]
      },
    ]
  },

  //  {
  //   path: 'edit-recipe/:recipeId',
  //   component: EditRecipeComponent,
  //   // canActivate: [AuthGuard]

  // },
  // {
  //   path: 'delete-recipe/:recipeId',
  //   component: DeleteRecipeComponent,
  //   // canActivate: [AuthGuard]

  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }