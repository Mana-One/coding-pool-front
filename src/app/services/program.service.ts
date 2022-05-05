import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from '../models/login';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CodeLanguage} from '../models/code-language';
import {ProgramSubmission} from '../models/program-submission';
import {SubmissionResult} from '../models/submission-result';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(
    private http: HttpClient,
  ) { }

  createProgram(login: Login): Observable<any>{
    return this.http.post( environment.api_url + '/programs', null);
  }

  getMyPortfolio(limit: number, offset: number): Observable<any>{
    return this.http.get( environment.api_url + `/programs/portfolio/me?limit=${limit}&offset=${offset}`);
  }

  getProgram(programId: string): Observable<any>{
    return this.http.get( environment.api_url + '/programs/' + programId);
  }

  getListCodeLanguageAvailable(): Observable<CodeLanguage[]>{
    return this.http.get<CodeLanguage[]>( environment.api_code_execution_url + '/languages');
  }

  submitCode(submission: ProgramSubmission): Observable<SubmissionResult> {
    return this.http.post<SubmissionResult>( environment.api_code_execution_url + '/submissions?wait=true', submission);
  }
}
