import { Component, OnInit } from '@angular/core';
import {ContestService} from '../../services/contest.service';
import {ActivatedRoute} from '@angular/router';
import {ContestRule} from '../../models/contest-rule';
import {PaginatedRequestClassementContest} from '../../models/paginated-request-result-publication';
import {Classement} from '../../models/paginatedRequestContentPublication';
import {ProgramService} from '../../services/program.service';
import {CodeLanguage} from '../../models/code-language';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit {

  contestId: string;
  contestRule: ContestRule;
  contestError: string;
  searchingContestRule = false;

  contestLeaderBoardError: string;
  searchingContestLeaderBoard = false;
  contestLeaderBoard: Classement[];
  panelOpenState = false;
  codeLanguages: CodeLanguage[] = [];
  contestEnded = false;
  contestNotStarted = false;
  isAdmin = false;
  userCode: string;
  userCodeFound = false;

  constructor(
    private contestService: ContestService,
    private activatedRoute: ActivatedRoute,
    private programService: ProgramService,
    private activatedRoute2: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute2.data.subscribe(data => {
      this.isAdmin = data.type === 'admin';
    });
    this.activatedRoute.params.subscribe(data => {
      this.contestId = data.id;
    });
    if (!this.isAdmin){
      this.contestService.getLastAnwserContest(this.contestId).subscribe(
        value => {
          this.userCode = value.sourceCode;
          this.userCodeFound = true;
        }
      );
    } else {
      this.userCodeFound = true;
    }
    this.getListCodeLanguageAvailable();
    this.getContestRules();
    this.getContestLeaderBoard();
  }

  getContestRules(): void{
    this.contestError = null;
    this.searchingContestRule = true;
    this.contestService.getContestRule(this.contestId).subscribe(
      value => {
        this.contestRule = value;
        this.contestEnded = this.isInThePast(new Date(value.endDate));
        this.contestNotStarted = this.isInTheFuture(new Date(value.startDate));
        this.searchingContestRule = false;
      },
      error => {
        this.contestError = error.message;
        this.searchingContestRule = false;
      }
    );
  }

  isInThePast(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  }

  isInTheFuture(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  }

  getContestLeaderBoard(): void{
    this.contestLeaderBoardError = null;
    this.searchingContestLeaderBoard = true;
    this.contestService.getContestLeaderBoard(this.contestId, 10, 0).subscribe(
      value => {
        this.contestLeaderBoard = value.data;
        this.searchingContestLeaderBoard = false;
      },
      error => {
        this.contestLeaderBoardError = error.message;
        this.searchingContestLeaderBoard = false;
      }
    );
  }

  retryGetContestRules(): void{
    this.getContestRules();
  }

  retryGetContestLeaderBoard(): void{
    this.getContestLeaderBoard();
  }

  getDate(createdAt: string): string {
    return createdAt.split('T')[0];
  }

  getListCodeLanguageAvailable(): void{
    this.programService.getListCodeLanguageAvailable().subscribe(
      value => {
        const result = value.filter(c => c.id === 1 || c.id === 24);
        this.codeLanguages = result;
      }, error => {
      });
  }

  getLangageName(languageId: number): string {
    const lang = this.codeLanguages.find(l => l.id === languageId);
    return lang.name;
  }
}
