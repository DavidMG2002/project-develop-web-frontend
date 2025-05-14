import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '@core/models/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  urlBaseServices: string = URL_SERVICIOS;

  constructor(private readonly http: HttpClient) { }

  createUser(userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/create`;
    return this.http.post<any>(endpoint, userData);
  }

  updateUser(userId: number, userData: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/delete/${userId}`;
    return this.http.delete<any>(endpoint);
  }

  deleteUser(userId: number): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/create`;
    return this.http.delete<any>(endpoint);
  }

  getAllUserByAdministrator(filters?: any): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users`;
    const params = new HttpParams({ fromObject: {
      nombre: filters?.name || '',
      email: filters?.email || ''
    } });
    return this.http.get<any>(endpoint, { params });
  }

  getAllAdministrator(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/1`;
    return this.http.get<any>(endpoint);
  }

  getAllUsers(): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/users/rol/2`;
    return this.http.get<any>(endpoint);
  }
  
}
