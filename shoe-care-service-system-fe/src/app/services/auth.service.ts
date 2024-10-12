import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment.development';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private tokenExpirationTime = 0;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router:  Router) {
  }

  private saveToken(token: string, expirationTime: number): void {
    localStorage.setItem(this.tokenKey, token);
    this.tokenExpirationTime = expirationTime;
    this.scheduleTokenRefresh();
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string): Observable<any> {
    const loginData = {username, password};
    return this.http.post<any>(`${environment.apiUrl}/auth/token`, loginData).pipe(
      tap((response) => {
        if (response.result.authenticated) {
          const token = response.result.token;
          const expirationTime = this.parseJwt(token).exp * 1000;
          this.saveToken(token, expirationTime);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem(this.tokenKey);
    if (!refreshToken) {
      return new Observable();
    }

    return this.http.post<any>(`${environment.apiUrl}/auth/refresh`, {refreshToken}).pipe(
      tap((response) => {
        const newToken = response.result.token;
        const expirationTime = this.parseJwt(newToken).exp * 1000;
        this.saveToken(newToken, expirationTime);
      })
    );
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  private scheduleTokenRefresh() {
    const timeout = this.tokenExpirationTime - Date.now() - 60000;
    if (timeout > 0) {
      setTimeout(() => this.refreshToken().subscribe(), timeout);
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
    this.http.post<any>(`${environment.apiUrl}/auth/logout`, {}).subscribe();
  }

  public getCurrentUser(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = this.parseJwt(token);
      return payload.sub;
    } else {
      this.router.navigate(['/login']).then(r => console.log('Navigate to login page'));
      return null;
    }
  }

}
