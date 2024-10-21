import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientCategoryService {
  constructor(private readonly http: HttpClient) {
  }

  getClientCategories(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/client-categories`);
  }

  addClientCategory(category: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/client-categories`, category);
  }

  updateClientCategory(category: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/client-categories`, category);
  }

  deleteClientCategory(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/client-categories/${id}`);
  }

  findById(categoryId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/client-categories/${categoryId}`);
  }
}
