import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  constructor(private readonly http: HttpClient) {
  }

  getColors(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/colors`);
  }

  addColor(color: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/colors`, color);
  }

  updateColor(color: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/colors`, color);
  }

  deleteColor(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/colors/${id}`);
  }

  findById(colorId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/colors/${colorId}`);
  }

  findAllByProductId(productId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/colors/products/${productId}`);
  }
}
