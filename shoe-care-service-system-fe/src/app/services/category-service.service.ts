import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  constructor(private readonly http: HttpClient) {
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/category-services`);
  }

  addCategory(category: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/category-services`, category);
  }

  updateCategory(category: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/category-services`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/category-services/${id}`);
  }

  findById(categoryId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/category-services/${categoryId}`);
  }
}
