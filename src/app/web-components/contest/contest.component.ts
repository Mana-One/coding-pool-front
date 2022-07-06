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

  constructor(
    private contestService: ContestService,
    private activatedRoute: ActivatedRoute,
    private programService: ProgramService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.contestId = data.id;
    });
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
        this.searchingContestRule = false;
      },
      error => {
        this.contestError = error.message;
        this.searchingContestRule = false;
      }
    );
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
        this.codeLanguages = value;
      }, error => {
      });
  }

  getLangageName(languageId: number): string {
    const lang = this.codeLanguages.find(l => l.id === languageId);
    return lang.name;
  }
}