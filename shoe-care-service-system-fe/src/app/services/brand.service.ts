import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private readonly http: HttpClient) {
  }

  getBrands(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/brands`);
  }

  addBrand(brand: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/brands`, brand);
  }

  updateBrand(brand: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/brands`, brand);
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/brands/${id}`);
  }

  findById(brandId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/brands/${brandId}`);
  }
}
