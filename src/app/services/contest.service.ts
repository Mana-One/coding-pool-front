import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ContestCreation} from '../models/contest-creation';
import {CodeContest} from '../models/code-contest';
import {PaginatedRequestClassementContest, PaginatedRequestResultContest} from '../models/paginated-request-result-publication';
import {ContestRule} from '../models/contest-rule';
import {ProgramSubmission} from '../models/program-submission';
import {SubmissionResult} from '../models/submission-result';

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

  getContestRule(contestId: string): Observable<ContestRule>{
    return this.http.get<ContestRule>( environment.api_url + `/competitions/${contestId}/public`);
  }

  submitAnwserContest(contestId: string, code: CodeContest): Observable<any>{
    return this.http.post( environment.api_url + `/submissions/${contestId}`, code);
  }

  getNextContest(next: string): Observable<PaginatedRequestResultContest>{
    return this.http.get<PaginatedRequestResultContest>(next);
  }

  getContestLeaderBoard(contestId: string, limit: number, offset: number): Observable<PaginatedRequestClassementContest>{
    return this.http.get<PaginatedRequestClassementContest>( environment.api_url + `/submissions/leaderboards/${contestId}?limit=${limit}&offset=${offset}`);
  }

  getAnwserContest(token: string): Observable<SubmissionResult> {
    return this.http.get<SubmissionResult>( environment.api_code_execution_url + `/submissions/${token}`);
  }

}
