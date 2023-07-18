import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component'
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { RecipesListComponent } from './recipe/recipes-list/recipes-list.component';
import { RecipeModule } from './recipe/recipe.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    UserModule,
    RecipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
