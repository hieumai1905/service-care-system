import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const isAuthUrl = req.url.includes('/auth');

    if (isAuthUrl) {
      return next.handle(req);
    }

    if (!token || this.authService.isTokenExpired()) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('Token expired or not found'));
    }

    if (token && !isAuthUrl) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
          return throwError(() => new Error('Unauthorized - Token invalid or expired'));
        }
        return throwError(error);
      })
    );
  }
}
