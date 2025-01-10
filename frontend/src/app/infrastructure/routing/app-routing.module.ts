import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '../../feature-modules/auth/login/login-form.component';
import { RegisterFormComponent } from '../../feature-modules/auth/register/register-form.component';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent},
	{ path: 'register', component: RegisterFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
