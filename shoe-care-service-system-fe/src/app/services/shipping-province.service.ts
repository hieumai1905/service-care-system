import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ShippingProvinceService {
  constructor(private readonly http: HttpClient) {
  }

  getProvinces(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/shipping-provinces`);
  }

  addProvince(province: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/shipping-provinces`, province);
  }

  updateProvince(id: number, province: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/shipping-provinces`, province);
  }

  deleteProvince(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/shipping-provinces/${id}`);
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/shipping-provinces/${id}`);
  }
}
