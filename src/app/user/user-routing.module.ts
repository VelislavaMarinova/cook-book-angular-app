import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../core/guards/authGuard';
// import { notAuthGuard } from '../core/guards/notAuthGuard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthActivate],
    // data: {
    //   showAfterAuth: false
    // }
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [AuthActivate],
    // data: {
    //   showAfterAuth: false
    // }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
