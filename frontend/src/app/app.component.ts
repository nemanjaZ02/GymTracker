import { Component, OnInit } from '@angular/core';
import { AuthService } from './feature-modules/auth/auth.service';
import { User } from './infrastructure/models/user.model';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../styles.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  user: User | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;

    this.checkIfUserExists();
  })};

  private checkIfUserExists(): void {
    this.authService.checkIfUserExists();
  }
}
