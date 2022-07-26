import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Program} from '../../models/program';
import {PaginatedRequestResultContest, PaginatedRequestResultPrograms} from '../../models/paginated-request-result-publication';
import {CodeLanguage} from '../../models/code-language';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProgramService} from '../../services/program.service';
import {ScrollService} from '../../services/scroll.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ProgramCreation} from '../../models/program-creation';
import {Contest} from '../../models/paginatedRequestContentPublication';
import {ContestService} from '../../services/contest.service';
import {ContestCreation} from '../../models/contest-creation';
import {MatRadioChange} from '@angular/material/radio';

@Component({
  selector: 'app-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.scss']
})
export class ContestsComponent implements OnInit {
  offset = 0;
  limit = 10;
  contest: Contest[] = [];
  contestError: string;
  lastRequestResult: PaginatedRequestResultContest;
  alreadyScrolledBottom = true;
  isFirstGet = true;
  searchingContests = false;
  noContest = false;
  noMore = false;
  createContestSuccess = false;
  createContestError: string;
  codeLanguages: CodeLanguage[] = [];
  selectedLanguage: number;
  contestCreationForm: FormGroup;
  today = new Date();
  defaultStatus = 'scheduled';
  type = 'user';
  isAdmin: boolean;

  constructor(
    private contestService: ContestService,
    private programService: ProgramService,
    private scrollService: ScrollService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
  ) { }

  @ViewChild('creationContestForm', { static: true }) creationContestForm: TemplateRef<any>;
  @ViewChild('awaitingCreationContest', { static: true }) awaitingCreationContest: TemplateRef<any>;
  @ViewChild('creationContestRequestResult', { static: true }) creationContestRequestResult: TemplateRef<any>;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.type = data.type;
      this.isAdmin = this.type === 'admin';
    });
    this.today.setDate( this.today.getDate() + 1 );
    this.scrollService.scrollChangeEmitted$.subscribe(value => {
      if (value > 90 && !this.alreadyScrolledBottom){
        this.alreadyScrolledBottom = true;
        this.getNextContests();
      }
    });
    this.getFirstContests();

    this.getListCodeLanguageAvailable();
    this.contestCreationForm = new FormGroup({
      contestName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('\\s*\\S.*')]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      programLanguageId: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required, Validators.minLength(20), Validators.pattern('\\s*\\S.*')]),
      input: new FormControl('', [Validators.pattern('\\s*\\S.*')]),
      output: new FormControl('', [Validators.required, Validators.pattern('\\s*\\S.*')])
    });
  }

  getListCodeLanguageAvailable(): void{
    this.programService.getListCodeLanguageAvailable().subscribe(
      value => {
        const result = value.filter(c => c.id === 1 || c.id === 24);
        this.codeLanguages = result;
      }, error => {
      });
  }

  getFirstContests(): void {
    this.searchingContests = true;
    this.isFirstGet = true;
    this.noContest = false;
    this.noMore = false;
    this.contestError = '';
    this.contest = [];
    this.getContestsHandler(this.contestService.getContests(this.defaultStatus, this.limit, this.offset));
  }

  getNextContests(): void{
    this.searchingContests = true;
    this.getContestsHandler(this.contestService.getNextContest(this.lastRequestResult.next));
  }

  getContestsHandler(requestResult: Observable<PaginatedRequestResultContest>): void{
    requestResult.subscribe(
      value => {
        this.lastRequestResult = value;
        this.contest = this.contest.concat(this.lastRequestResult.data);
      },
      error => {
        this.searchingContests = false;
        this.contestService = error.message;
      },
      () => {
        this.searchingContests = false;
        if (this.lastRequestResult.total < 1 || this.lastRequestResult.next == null) {
          if (this.isFirstGet && this.lastRequestResult.data.length < 1) {
            this.noContest = true;
          }else{
            this.noMore = true;
          }
          this.alreadyScrolledBottom = true;
        }else{
          this.alreadyScrolledBottom = false;
        }
        if (this.isFirstGet){
          this.isFirstGet = !this.isFirstGet;
        }
      });
  }

  retryGetContest(): void {
    this.contestError = null;
    if (this.isFirstGet){
      this.getFirstContests();
    } else {
      this.getNextContests();
    }
  }

  getDate(createdAt: string): string {
    return createdAt.split('T')[0];
  }

  openDialog(dialog: any): void{
    this.dialog.closeAll();
    this.dialog.open(dialog, {disableClose: true});
  }

  closePopUp(): void {
    this.dialog.closeAll();
    if (this.createContestSuccess){
      this.getFirstContests();
      this.createContestSuccess = false;
    }
    setTimeout(() => {
      this.createContestError = '';
    }, 500);
  }

  openContestCreationForm(): void {
    this.openDialog(this.creationContestForm);
  }

  createContest(): void {
    const contestName = this.contestCreationForm.controls.contestName.value;
    const startDate = this.transformDate(this.contestCreationForm.controls.startDate.value);
    const endDate = this.transformDate(this.contestCreationForm.controls.endDate.value);
    const programLanguageId = this.contestCreationForm.controls.programLanguageId.value;
    const description = this.contestCreationForm.controls.description.value;
    const input = this.contestCreationForm.controls.input.value;
    const output = this.contestCreationForm.controls.output.value;

    this.openDialog(this.awaitingCreationContest);
    this.contestService.createContest(new ContestCreation(contestName, description, startDate, endDate, programLanguageId, input, output)).subscribe(
      value => {
        this.createContestSuccess = true;
        this.contestCreationForm.controls.contestName.setValue('');
        this.contestCreationForm.controls.startDate.setValue('');
        this.contestCreationForm.controls.endDate.setValue('');
        this.contestCreationForm.controls.programLanguageId.setValue('');
        this.contestCreationForm.controls.description.setValue('');
        this.contestCreationForm.controls.input.setValue('');
        this.contestCreationForm.controls.output.setValue('');

        this.contestCreationForm.markAsUntouched();
        this.openDialog(this.creationContestRequestResult);
      },
      error => {
        console.log(error);
        this.createContestError = error.message;
        this.openDialog(this.creationContestRequestResult);
      }
    );
  }

  transformDate(date: Date): string {
    const dateElem = date.toLocaleDateString().split('/');
    return dateElem[2] + '-' + dateElem[1] + '-' + dateElem[0];
  }

  getContestWithStatus(event: MatRadioChange): void {
    this.defaultStatus = event.value;
    this.getFirstContests();
  }
}

















