import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(private readonly http: HttpClient) {
  }

  getPermissions(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/permissions`);
  }

  addPermission(permission: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/permissions`, permission);
  }

  updatePermission(name: string, permission: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/permissions/${name}`, permission);
  }

  deletePermission(name: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/permissions/${name}`);
  }

  findByName(permissionName: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/permissions/${permissionName}`);
  }
}
