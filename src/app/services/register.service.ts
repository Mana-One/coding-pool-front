import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Register} from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(register: Register): Observable<any>{
    return this.http.post( environment.api_url + '/accounts/register', register);
  }

  checkUserName(userName: string): Observable<any>{
    return this.http.get( environment.api_url + `/accounts/check-username/${userName}`);
  }
}
