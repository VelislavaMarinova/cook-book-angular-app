import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { SharedModule } from '../shared/shared.module';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipesMainComponent } from './recipes-main/recipes-main.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeCategoriesComponent } from './recipe-categories/recipe-categories.component';
import { RecipeCategoryItemComponent } from './recipe-category-item/recipe-category-item.component';
import { RecipeListByCategoryComponent } from './recipe-list-by-category/recipe-list-by-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component';

@NgModule({
  declarations: [
    RecipeDetailsComponent,
    RecipesMainComponent,
    RecipeStartComponent,
    RecipeCategoriesComponent,
    RecipeCategoryItemComponent,
    RecipeListByCategoryComponent,
    EditRecipeComponent,
    DeleteRecipeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecipeRoutingModule,
    ReactiveFormsModule
  ],
  exports:[]
})
export class RecipeModule { }
