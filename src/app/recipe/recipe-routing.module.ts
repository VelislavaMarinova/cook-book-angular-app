import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
// import { AuthGuard } from '../core/guards/authGuard';
import { RecipesMainComponent } from './recipes-main/recipes-main.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeCategoryItemComponent } from './recipe-category-item/recipe-category-item.component';
import { RecipeListByCategoryComponent } from './recipe-list-by-category/recipe-list-by-category.component';
import { AuthGuard } from '../core/guards/authGuard';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';


const routes: Routes = [
  {
    path: 'recipes',
  
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
        path: ':category/:recipeId',
        component: RecipeDetailsComponent
      },
    
    ]
  },
  {
    path: 'add-recipe',
    component: NewRecipeComponent,
    // canActivate: [AuthGuard]

},
   {
    path: 'edit-recipe/:recipeId',
    component: EditRecipeComponent,
    // canActivate: [AuthGuard]

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