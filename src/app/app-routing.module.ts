import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

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
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
 //{path: 'users', loadChildren:()=>import('./user/user.module').then((m) => m.UserModule) }//'./recipe/recipe-routing.module.ts'
  // { path: '**', component: NotFoundComponent },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  // },
  // { path: 'error', component: ErrorComponent },

  // { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
