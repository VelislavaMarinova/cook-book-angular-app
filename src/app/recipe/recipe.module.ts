import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { SharedModule } from '../shared/shared.module';
import { RecipeRoutingModule } from './recipe-routing.module';
import { UserModule } from '../user/user.module';



@NgModule({
  declarations: [
    NewRecipeComponent,
    RecipeDetailsComponent,
    RecipesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    RecipeRoutingModule,
    // UserModule
  ]
})
export class RecipeModule { }
