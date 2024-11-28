import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CouponItemService {

  constructor(private readonly http: HttpClient) {
  }
  getCouponItems(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/coupons/coupon-items`);
  }
  searchCouponItems(searchKey: string) {
    return this.http.get<any>(`${environment.apiUrl}/coupons/search-coupon-items/${searchKey}`);
  }

  validateCouponItem(code: string){
    return this.http.get<any>(`${environment.apiUrl}/coupons/get-coupon-item/${code}`);
  }
}
