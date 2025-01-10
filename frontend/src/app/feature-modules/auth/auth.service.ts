import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorage } from '../../infrastructure/jwt/token.service';
import { User } from '../../infrastructure/models/user.model';
import { AuthenticationResponse } from '../../infrastructure/models/authentication-response.model';
import { Registration } from '../../infrastructure/models/registration.model';
import { environment } from '../../../env/environment';
import { Login } from '../../infrastructure/models/login.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<User>({username: "", id: 0, email: "" });

  constructor(private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router) { }

  login(login: Login): Observable<AuthenticationResponse> {
    return this.http
      .post<AuthenticationResponse>(environment.apiHost + 'user/login', login)
      .pipe(
        tap((authenticationResponse) => {
          this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
          this.setUser();
        })
      );
  }

  register(registration: Registration): Observable<AuthenticationResponse> {
    return this.http
    .post<AuthenticationResponse>(environment.apiHost + 'user/register', registration)
    .pipe(
      tap((authenticationResponse) => {
        this.tokenStorage.saveAccessToken(authenticationResponse.accessToken);
        this.setUser();
      })
    );
  }

  logout(): void {
    this.router.navigate(['/home']).then(_ => {
      this.tokenStorage.clear();
      this.user$.next({username: "", id: 0, email: "" });
      }
    );
  }

  checkIfUserExists(): void {
    const accessToken = this.tokenStorage.getAccessToken();
    if (accessToken == null) {
      return;
    }
    this.setUser();
  }

  private setUser(): void {
    const jwtHelperService = new JwtHelperService();
    const accessToken = this.tokenStorage.getAccessToken() || "";
    const user: User = {
      id: jwtHelperService.decodeToken(accessToken).id,
      username: jwtHelperService.decodeToken(accessToken).username,
      email: jwtHelperService.decodeToken(accessToken).email
    };
    this.user$.next(user);
  }
}
