import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/myIfo`);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users`);
  }

  searchUser(query: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/search?q=${query}`);
  }

  findById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/users/${id}`);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/users`, user);
  }
}
