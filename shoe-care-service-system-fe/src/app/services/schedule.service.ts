import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private readonly http: HttpClient) {
  }

  getSchedules(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/schedules`);
  }

  addSchedule(schedule: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/schedules`, schedule);
  }

  searchSchedules(keyword: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/schedules/search?q=${keyword}`);
  }

  updateSchedule(id: number, schedule: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/schedules/${id}`, schedule);
  }

  deleteSchedule(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/schedules/${id}`);
  }

  findById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/schedules/${id}`);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}/schedules/status/${id}?status=${status}`, {});
  }
}
