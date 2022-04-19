import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserInfos} from '../models/user-infos';
import {ChangePassword} from '../models/change-password';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getConnectedUserInfo(): Observable<UserInfos>{
    return this.http.get<UserInfos>( environment.api_url + '/accounts/me');
  }

  changeUserPassword(changePassword: ChangePassword): Observable<any>{
    return this.http.put( environment.api_url + '/accounts/me/password', changePassword);
  }

}
