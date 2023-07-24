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
import { RecipeCategoriesComponent } from './recipe-categories/recipe-categories.component';
import { RecipeCategoryItemComponent } from './recipe-category-item/recipe-category-item.component';
import { RecipeListByCategoryComponent } from './recipe-list-by-category/recipe-list-by-category.component';
import { ShortenPipe } from '../shared/pipes/shorten.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NewRecipeComponent,
    RecipeDetailsComponent,
    RecipesListComponent,
    RecipesMainComponent,
    RecipeStartComponent,
    RecipeItemComponent,
    RecipeCategoriesComponent,
    RecipeCategoryItemComponent,
    RecipeListByCategoryComponent,
  ],
  imports: [
    CommonModule,
    SharedModule, 
    RecipeRoutingModule,
    FormsModule
  ]
})
export class RecipeModule { }
