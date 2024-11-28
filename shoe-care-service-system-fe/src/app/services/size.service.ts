import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  constructor(private readonly http: HttpClient) {
  }

  getSizes(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/sizes`);
  }

  addSize(size: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/sizes`, size);
  }

  updateSize(size: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/sizes`, size);
  }

  deleteSize(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/sizes/${id}`);
  }

  findById(sizeId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sizes/${sizeId}`);
  }

  findAllByProductId(productId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/sizes/products/${productId}`);
  }
}
