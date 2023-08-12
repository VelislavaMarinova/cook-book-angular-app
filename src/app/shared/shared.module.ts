import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { NoRecipesComponent } from './no-recipes/no-recipes.component';
import { RouterModule } from '@angular/router';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@NgModule({
  declarations: [
    LoaderComponent,
    ShortenPipe,
    NoRecipesComponent,
    RecipeItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LoaderComponent,
    ShortenPipe,
    NoRecipesComponent,
    RecipeItemComponent,
  ]
})
export class SharedModule { }
