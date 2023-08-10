import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewRecipeComponent } from './recipe/new-recipe/new-recipe.component';

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
    component: ProfileComponent
  },
  {
    path: 'add-recipe',
    component: NewRecipeComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'recipes',
    loadChildren: () => import('./recipe/recipe.module').then((m) => m.RecipeModule),
  },

 { path: '**', component: NotFoundComponent },

  // { path: 'error', component: ErrorComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
