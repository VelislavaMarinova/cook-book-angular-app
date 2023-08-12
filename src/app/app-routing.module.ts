import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AuthGuard } from './core/guards/authGuard';
import { ErrorComponent } from './core/error/error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: "home",
  },
  {
    path: 'home',
    component: HomeComponent
  },  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
    
  },
  {
    path: 'add-recipe',
    component: NewRecipeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipe/recipe.module').then((m) => m.RecipeModule),
  },
  {
    path: 'error',
    component: ErrorComponent,
   
  },
{ path: '**', component: NotFoundComponent },

  // { path: 'error', component: ErrorComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
