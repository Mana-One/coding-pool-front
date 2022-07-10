import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserInfos} from '../models/user-infos';
import {ChangePassword} from '../models/change-password';
import {UserStats} from '../models/user-stats';
import { JwtHelperService } from '@auth0/angular-jwt';
import {PaginatedRequestResultUsers} from '../models/paginated-request-result-publication';
import {EditAccount} from '../models/edit-account';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  connectedUserId: string;
  connectedUserRole: string;
  connectedUserPicture: string;
  helper = new JwtHelperService();
  profilPicture: EventEmitter<string> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getConnectedUserInfo(): Observable<UserInfos>{
    return this.http.get<UserInfos>( environment.api_url + '/accounts/me');
  }

  changeUserPassword(changePassword: ChangePassword): Observable<any>{
    return this.http.put( environment.api_url + '/accounts/me/password', changePassword);
  }

  changeUserInformations(editAccount: EditAccount): Observable<any>{
    const formData = new FormData();
    if (editAccount.email !== '' && editAccount.email !== null){
      formData.append('email', editAccount.email);
    }
    if (editAccount.username !== '' && editAccount.username !== null){
      formData.append('username', editAccount.username);
    }
    if (editAccount.picture !== '' && editAccount.picture !== null){
      formData.append('picture', editAccount.picture);
    }
    return this.http.put( environment.api_url + '/accounts/me', formData);
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

  setConnectedUserInfoFromToken(token: any): void{
    const decodedToken = this.helper.decodeToken(token);
    console.log(decodedToken)
    this.connectedUserId = decodedToken.sub;
    this.connectedUserRole = decodedToken.role;
  }

  isConnectedUserOwner(userId: string): boolean {
    return this.connectedUserId === userId;
  }

  isConnectedUserAdmin(): boolean {
    return this.connectedUserRole === 'admin';
  }

  setProfilPicture(picture: string): void {
    this.connectedUserPicture = picture;
    localStorage.setItem('picture', picture);
    this.profilPicture.emit(picture);
  }

  getProfilPicture(): void {
    this.profilPicture.emit(localStorage.getItem('picture'));
  }

  getProfilPictureEmiter(): EventEmitter<string> {
    return this.profilPicture;
  }
}
