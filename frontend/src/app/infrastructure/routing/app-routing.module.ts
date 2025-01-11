import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from '../../feature-modules/auth/login/login-form.component';
import { RegisterFormComponent } from '../../feature-modules/auth/registration/register-form.component';
import { AddWorkoutComponent } from '../../feature-modules/workout/add-workout/add-workout.component';
import { AuthGuard } from '../../feature-modules/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginFormComponent, canActivate: [AuthGuard], data: { guestOnly: true } },
	{ path: 'register', component: RegisterFormComponent, canActivate: [AuthGuard], data: { guestOnly: true } },
  { path: 'workouts/add', component: AddWorkoutComponent, canActivate: [AuthGuard], data: { requiresAuth: true } },
  { path: 'home', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
