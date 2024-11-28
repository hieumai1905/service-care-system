import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';
import {Client} from "../model/Client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private readonly http: HttpClient) {
  }

  getClients(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/clients`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<any>(`${environment.apiUrl}/clients`, client);
  }

  updateClient(client: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/clients`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/clients/${id}`);
  }

  findById(clientId: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/clients/${clientId}`);
  }

  searchClients(searchKey: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/clients/search?q=${searchKey}`);
  }

  findByPhone(phoneSearch: string) {
    return this.http.get<any>(`${environment.apiUrl}/clients/phone?tel=${phoneSearch}`);
  }
}
