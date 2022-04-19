import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {PublicationCreation} from '../models/publicationCreation';
import {PaginatedPublication} from '../models/paginated-publication';

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
    return this.http.delete( environment.api_url + `/likes/${publicationId}`, null);
  }

  commentPublication(comment: Comment): Observable<any>{
    return this.http.post( environment.api_url + '/comments', comment);
  }

  myPublications(): Observable<PaginatedPublication>{
    return this.http.get<PaginatedPublication>( environment.api_url + '/publications/me');
  }

  userPublication(userId: number): Observable<PaginatedPublication>{
    return this.http.get<PaginatedPublication>( environment.api_url + `/publications/${userId}`);
  }
}
