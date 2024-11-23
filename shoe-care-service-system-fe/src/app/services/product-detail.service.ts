import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  constructor(private readonly http: HttpClient) {
  }

  getProductDetailByProductId(productId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/product-details/${productId}`);
  }
}
