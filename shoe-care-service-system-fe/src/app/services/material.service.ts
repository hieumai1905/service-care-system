import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  constructor(private readonly http: HttpClient) {
  }

  getMaterials(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/materials`);
  }

  addMaterial(material: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/materials`, material);
  }

  updateMaterial(material: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/materials`, material);
  }

  deleteMaterial(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/materials/${id}`);
  }

  findById(materialId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/materials/${materialId}`);
  }
}
