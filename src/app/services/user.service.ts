import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserInfos} from '../models/user-infos';
import {ChangePassword} from '../models/change-password';
import {UserStats} from '../models/user-stats';
import { JwtHelperService } from '@auth0/angular-jwt';
import {PaginatedRequestResultUsers} from '../models/paginated-request-result-publication';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  connectedUserId: string;
  helper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  getConnectedUserInfo(): Observable<UserInfos>{
    return this.http.get<UserInfos>( environment.api_url + '/accounts/me');
  }

  changeUserPassword(changePassword: ChangePassword): Observable<any>{
    return this.http.put( environment.api_url + '/accounts/me/password', changePassword);
  }

  getConnectedUserStats(): Observable<UserStats>{
    return this.http.get<UserStats>( environment.api_url + '/users/me');
  }

  getUserStats(userId: string): Observable<UserStats>{
    return this.http.get<UserStats>( environment.api_url + `/users/${userId}`);
  }

  searchUsers(username: string, limit: number, offset: number): Observable<PaginatedRequestResultUsers>{
    return this.http.get<PaginatedRequestResultUsers>( environment.api_url + `/users/search?username=${username}&limit=${limit}&offset=${offset}`);
  }
  searchNextUsers(request: string): Observable<PaginatedRequestResultUsers>{
    return this.http.get<PaginatedRequestResultUsers>(request);
  }

  setConnectedUserIdFromToken(token: any): void{
    const decodedToken = this.helper.decodeToken(token);
    this.connectedUserId = decodedToken.sub;
  }

  isConnectedUserOwner(userId: string): boolean {
    return this.connectedUserId === userId;
  }

}
