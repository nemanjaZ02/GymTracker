import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from '../../../infrastructure/models/login.model';

@Component({
  standalone: false,
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css', '../../../../styles.css']
})
export class LoginFormComponent {
  constructor( private authService: AuthService, private router: Router ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  login(): void {
    const login: Login = {
      email: this.loginForm.value.email || "",
      password: this.loginForm.value.password || "",
    };

    if (this.loginForm.valid) {
      this.authService.login(login).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
