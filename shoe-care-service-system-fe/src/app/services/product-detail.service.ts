import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private readonly http: HttpClient) {
  }

  getProductDetailByProductId(productId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/product-details/${productId}`);
  }

  findProductByColorAndSizeAndProductId(productId: number, sizeId: number, colorId: number): Observable<any> {
    const params = new HttpParams()
      .set('productId', productId.toString())
      .set('colorId', colorId.toString())
      .set('sizeId', sizeId.toString());

    return this.http.get<any>(`${environment.apiUrl}/product-details`, { params });
  }
}
