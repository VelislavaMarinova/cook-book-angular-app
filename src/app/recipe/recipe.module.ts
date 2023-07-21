import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { SharedModule } from '../shared/shared.module';
import { RecipeRoutingModule } from './recipe-routing.module';
import { UserModule } from '../user/user.module';
import { RecipesMainComponent } from './recipes-main/recipes-main.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';



@NgModule({
  declarations: [
    NewRecipeComponent,
    RecipeDetailsComponent,
    RecipesListComponent,
    RecipesMainComponent,
    RecipeStartComponent,
    RecipeItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule, 
    RecipeRoutingModule,
    // UserModule
  ]
})
export class RecipeModule { }
