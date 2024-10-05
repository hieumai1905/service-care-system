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
}
