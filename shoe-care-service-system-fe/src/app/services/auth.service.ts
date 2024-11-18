import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private tokenExpirationTimeKey = 'tokenExpirationTime';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string, expirationTime: number): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.tokenExpirationTimeKey, expirationTime.toString());
  }

  public getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token && this.isTokenExpired()) {
      this.logout();
      return null;
    }
    return token;
  }

  public isTokenExpired(): boolean {
    const expirationTime = localStorage.getItem(this.tokenExpirationTimeKey);
    if (!expirationTime) {
      return true;
    }
    return Date.now() > parseInt(expirationTime, 10);
  }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
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

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenExpirationTimeKey);
    this.isAuthenticatedSubject.next(false);
    this.http.post<any>(`${environment.apiUrl}/auth/logout`, {}).subscribe();
  }

  public getCurrentUser(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = this.parseJwt(token);
      return payload.sub;
    } else {
      this.router.navigate(['/login']).then((r) => console.log('Navigate to login page'));
      return null;
    }
  }
}
