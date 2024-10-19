import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  constructor(private readonly http: HttpClient) {
  }

  getCoupons(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/coupons`);
  }

  addCoupon(coupon: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/coupons`, coupon);
  }

  updateCoupon(coupon: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/coupons`, coupon);
  }

  deleteCoupon(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/coupons/${id}`);
  }

  findById(couponId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/coupons/${couponId}`);
  }
}
