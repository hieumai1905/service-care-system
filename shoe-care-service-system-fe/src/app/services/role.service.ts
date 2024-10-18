import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private readonly http: HttpClient) { }

  getRoles(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/roles`);
  }

  addRole(role: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/roles`, role);
  }

  updateRole(name: string, role: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/roles/${name}`, role);
  }

  deleteRole(name: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/roles/${name}`);
  }

  findByName(roleName: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/roles/${roleName}`);
  }
}
