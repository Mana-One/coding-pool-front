import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {PublicationCreation} from '../models/publicationCreation';
import {PaginatedRequestResultComment, PaginatedRequestResultPublication} from '../models/paginated-request-result-publication';
import {Publication} from '../models/publication';
import {Comment} from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class SocialNetworkService {

  constructor(private http: HttpClient) { }

  createPublication(publication: PublicationCreation): Observable<any>{
    return this.http.post( environment.api_url + '/publications', publication);
  }

  likePublication(publicationId: string): Observable<any>{
    return this.http.post( environment.api_url + `/likes/${publicationId}`, null);
  }

  unLikePublication(publicationId: string): Observable<any>{
    return this.http.delete( environment.api_url + `/likes/${publicationId}`);
  }

  commentPublication(comment: Comment): Observable<any>{
    return this.http.post( environment.api_url + '/comments', comment);
  }

  myPublications(limit: number, offset: number): Observable<PaginatedRequestResultPublication>{
    return this.http.get<PaginatedRequestResultPublication>( environment.api_url + `/publications/timeline/me?limit=${limit}&offset=${offset}`);
  }

  homePublication(limit: number, offset: number): Observable<PaginatedRequestResultPublication>{
    return this.http.get<PaginatedRequestResultPublication>( environment.api_url + `/publications/timeline/home?limit=${limit}&offset=${offset}`);
  }

  userPublication(userId: string, limit: number, offset: number): Observable<PaginatedRequestResultPublication>{
    return this.http.get<PaginatedRequestResultPublication>( environment.api_url + `/publications/timeline/${userId}?limit=${limit}&offset=${offset}`);
  }

  publicationComments(publicationId: string, limit: number, offset: number): Observable<PaginatedRequestResultComment>{
    return this.http.get<PaginatedRequestResultComment>( environment.api_url + `/comments?limit=${limit}&offset=${offset}&publicationId=${publicationId}`);
  }

  getNextPaginatedRequestResultPublication(path: string): Observable<PaginatedRequestResultPublication>{
    return this.http.get<PaginatedRequestResultPublication>(path);
  }

  getNextPaginatedRequestComment(path: string): Observable<PaginatedRequestResultComment>{
    return this.http.get<PaginatedRequestResultComment>(path);
  }

  getPublication(id: string): Observable<Publication>{
    return this.http.get<Publication>(environment.api_url + '/publications/' + id);
  }

  followUser(id: string): Observable<Publication>{
    return this.http.post<Publication>(environment.api_url + '/users/follow/' + id, null);
  }

  unFollowUser(id: string): Observable<Publication>{
    return this.http.delete<Publication>(environment.api_url + 'users/unfollow/' + id);
  }
}
