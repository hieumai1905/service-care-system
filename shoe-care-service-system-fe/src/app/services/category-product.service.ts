import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryProductService {
  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/category-products`);
  }

  addCategory(category: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/category-products`, category);
  }

  updateCategory(category: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/category-products`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/category-products/${id}`);
  }

  findById(categoryId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/category-products/${categoryId}`);
  }
}
