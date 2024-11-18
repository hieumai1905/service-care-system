import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) {
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/products`);
  }

  addProduct(product: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/products`, product);
  }

  updateProduct(product: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/products`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/products/${id}`);
  }

  findById(productId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/products/${productId}`);
  }

  searchProduct(searchKey: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/products/search?q=${searchKey}`);
  }
}
