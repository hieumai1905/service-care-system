import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly apiUrl = `${environment.apiUrl}/orders`;

  constructor(private readonly http: HttpClient) {
  }

  getOrders(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  findById(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${orderId}`);
  }

  addOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  updateOrder(order: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${order.id}`, order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  searchOrder(searchKey: string) {
    return this.http.get<any>(`${this.apiUrl}/search?q=${searchKey}`);
  }
}
