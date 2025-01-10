import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Registration } from '../../../infrastructure/models/registration.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css', '../../../../styles.css']
})
export class RegisterFormComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  register(): void {
    const registration: Registration = {
      id: 0,
      email: this.registrationForm.value.email || "",
      username: this.registrationForm.value.username || "",
      password: this.registrationForm.value.password || "",
    };

    if (this.registrationForm.valid) {
      this.authService.register(registration).subscribe({
        next: () => {
          this.router.navigateByUrl('/home');
        },error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
