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

  cancelOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancel/${orderId}`, {});
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  searchOrder(searchKey: string) {
    return this.http.get<any>(`${this.apiUrl}/search?q=${searchKey}`);
  }

  revenueByDay(date: Date): Observable<any> {
    const formattedDate = this.formatDateToISO(date);
    return this.http.get<any>(`${this.apiUrl}/revenue?date=${formattedDate}`);
  }

  revenueByWeek(date: Date): Observable<any> {
    const formattedDate = this.formatDateToISO(date);
    return this.http.get<any>(`${this.apiUrl}/revenue/week?date=${formattedDate}`);
  }

  completeRadio(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/completion-ratio`);
  }

  private formatDateToISO(date: Date): string {
    return date.toLocaleDateString('sv-SE');
  }

  getLatestOrders() {
    return this.http.get<any>(`${this.apiUrl}/latest`);
  }

  getOrdersByClientId(clientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/client/${clientId}`);
  }
}
