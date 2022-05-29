import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from '../models/login';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  helper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(login: Login): Observable<any>{
    return this.http.post( environment.api_url + '/auth/login', login);
  }

  logout(): void{
    if (localStorage.getItem('access_token')) {
      localStorage.removeItem('access_token');
    }
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  getToken(): any {
    return localStorage.getItem('access_token');
  }

  saveToken(token: any): void {
    localStorage.setItem('access_token', token);
  }

  removeIfTokenExpired(): void{
    const token = localStorage.getItem('access_token');
    if (token && this.helper.isTokenExpired(token)){
      this.logout();
    }
  }

}
