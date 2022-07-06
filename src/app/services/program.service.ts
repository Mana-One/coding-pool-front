import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CodeLanguage} from '../models/code-language';
import {ProgramSubmission} from '../models/program-submission';
import {SubmissionResult} from '../models/submission-result';
import {PaginatedRequestResultPrograms} from '../models/paginated-request-result-publication';
import {ProgramCreation} from '../models/program-creation';
import {ProgramData} from '../models/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(
    private http: HttpClient,
  ) { }

  createProgram(program: ProgramCreation): Observable<any>{
    return this.http.post( environment.api_url + '/programs', program);
  }

  getMyPortfolioPrograms(limit: number, offset: number): Observable<PaginatedRequestResultPrograms>{
    return this.http.get<PaginatedRequestResultPrograms>( environment.api_url + `/programs/portfolio/me?limit=${limit}&offset=${offset}`);
  }

  getNextPortfolioPrograms(request: string): Observable<PaginatedRequestResultPrograms>{
    return this.http.get<PaginatedRequestResultPrograms>(request);
  }

  getUserPortfolioPrograms(userId: string, limit: number, offset: number): Observable<PaginatedRequestResultPrograms>{
    return this.http.get<PaginatedRequestResultPrograms>( environment.api_url + `/programs/portfolio/?authorId=${userId}&limit=${limit}&offset=${offset}`);
  }

  getProgram(programId: string): Observable<ProgramData>{
    return this.http.get<ProgramData>( environment.api_url + '/programs/' + programId);
  }

  getListCodeLanguageAvailable(): Observable<CodeLanguage[]>{
    return this.http.get<CodeLanguage[]>( environment.api_code_execution_url + '/languages');
  }

  submitCode(submission: ProgramSubmission): Observable<SubmissionResult> {
    return this.http.post<SubmissionResult>( environment.api_code_execution_url + '/submissions?wait=true', submission);
  }
}
