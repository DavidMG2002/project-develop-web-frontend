import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '@core/models/config';
import * as jwt from "jwt-decode";
import { BehaviorSubject, Observable } from 'rxjs';
import { ROLES } from '@core/models/enums';
import { User } from '@core/models/user';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  urlBaseServices: string = URL_SERVICIOS;


  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  private readonly currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor( private readonly http: HttpClient,private readonly router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    const endpoint = `${this.urlBaseServices}/api/v1/auth/login`;
    return this.http.post<any>(endpoint, { email, password });
  }

  isAuthenticated(): boolean {
    const accessToken = sessionStorage.getItem('accessToken');
    return accessToken !== null;
  }

  getAuthFromSessionStorage(): any {
    try {
      const lsValue = sessionStorage.getItem('accessToken');
      if (!lsValue) {
        return undefined;
      }
      const decodedToken: any = jwt.jwtDecode(lsValue);

      return decodedToken;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  isAdminLogged(){
    const userInfo = this.getAuthFromSessionStorage();
    return userInfo.rol_id === ROLES.ADMIN;
  }

  isUserLogged() {
    const userInfo = this.getAuthFromSessionStorage();
    return userInfo.rol_id === ROLES.USER;
  }

  getTokenFromSessionStorage(): string | null {
    const isValue = sessionStorage.getItem('accessToken');
    return isValue;
  } 

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/authentication/signin'], {
      queryParams: {},
    });
  }

}
