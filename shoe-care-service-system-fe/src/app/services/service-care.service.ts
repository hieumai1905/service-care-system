import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ServiceCareService {

  constructor(private readonly http: HttpClient) {
  }

  getServices(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/shoe-services`);
  }

  addService(service: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/shoe-services`, service);
  }

  updateService(service: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/shoe-services`, service);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/shoe-services/${id}`);
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/shoe-services/${id}`);
  }

  searchServices(searchKey: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/shoe-services/search?q=${searchKey}`);
  }
}
