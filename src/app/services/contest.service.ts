import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ContestCreation} from '../models/contest-creation';
import {CodeContest} from '../models/code-contest';
import {PaginatedRequestResultContest} from '../models/paginated-request-result-publication';

@Injectable({
  providedIn: 'root'
})
export class ContestService {

  constructor(
    private http: HttpClient,
  ) { }

  createContest(contest: ContestCreation): Observable<any>{
    return this.http.post( environment.api_url + '/competitions', contest);
  }

  getContests(status: string, limit: number, offset: number): Observable<PaginatedRequestResultContest>{
    return this.http.get<PaginatedRequestResultContest>( environment.api_url + `/competitions?limit=${limit}&offset=${offset}&status=${status}`);
  }

  getContestRule(contestId: string): Observable<PaginatedRequestResultContest>{
    return this.http.get<PaginatedRequestResultContest>( environment.api_url + `/competitions/${contestId}/public`);
  }

  submitAnwserContest(contestId: string, code: CodeContest): Observable<any>{
    return this.http.post( environment.api_url + `/submissions/${contestId}`, code);
  }

  getNextContest(next: string): Observable<PaginatedRequestResultContest>{
    return this.http.get<PaginatedRequestResultContest>(next);
  }
}
