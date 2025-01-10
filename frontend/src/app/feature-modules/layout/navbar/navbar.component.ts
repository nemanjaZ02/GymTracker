import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../feature-modules/auth/auth.service';
import { User } from '../../../infrastructure/models/user.model';

@Component({
	standalone: false,
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css', '../../../../styles.css']
})
export class NavbarComponent implements OnInit {
	user: User | undefined;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authService.user$.subscribe(user => {
			this.user = user;
	})};

	logOut(): void {
    this.authService.logout();
  }
}
