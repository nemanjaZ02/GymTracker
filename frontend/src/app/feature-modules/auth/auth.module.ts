import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../infrastructure/mat/material';
import { LoginFormComponent } from './login/login-form.component';
import { RegisterFormComponent } from './register/register-form.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AuthModule { }
