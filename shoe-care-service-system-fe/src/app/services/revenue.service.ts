import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';
import {RevenueData} from "../model/RevenueData";

@Injectable({
  providedIn: 'root',
})
export class RevenueService {
  private readonly apiUrl = `${environment.apiUrl}/revenue`;

  constructor(private http: HttpClient) {
  }

  getLastSevenDaysRevenue(): Observable<RevenueData[]> {
    return this.http.get<RevenueData[]>(`${this.apiUrl}/last-seven-days`);
  }

  getRevenueByDateRange(startDate: string, endDate: string): Observable<RevenueData[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<RevenueData[]>(`${this.apiUrl}/range`, {params});
  }
}
