import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProgramService} from '../../services/program.service';
import {PaginatedRequestResultPrograms} from '../../models/paginated-request-result-publication';
import {ScrollService} from '../../services/scroll.service';
import {Observable} from 'rxjs';
import {Program} from '../../models/program';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CodeLanguage} from '../../models/code-language';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProgramContent, ProgramCreation, ProgramTitle} from '../../models/program-creation';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.scss']
})
export class MyPortfolioComponent implements OnInit {

  offset = 0;
  limit = 10;
  programs: Program[] = [];
  programsError: string;
  lastRequestResult: PaginatedRequestResultPrograms;
  alreadyScrolledBottom = true;
  isFirstGet = true;
  searchingPrograms = false;
  noPrograms = false;
  noMore = false;
  createProgramSuccess = false;
  createProgramError: string;
  codeLanguages: CodeLanguage[] = [];
  selectedLanguage: number;
  programCreationForm: FormGroup;
  modifyProgramForm: FormGroup;
  type = 'me';
  isMe: boolean;
  userId: string;
  selectedProgramId: string;

  @ViewChild('creationProgramForm', { static: true }) creationProgramForm: TemplateRef<any>;
  @ViewChild('awaitingCreationProgram', { static: true }) awaitingCreationProgram: TemplateRef<any>;
  @ViewChild('creationProgramRequestResult', { static: true }) creationProgramRequestResult: TemplateRef<any>;

  @ViewChild('modifyProgramName', { static: true }) modifyProgramName: TemplateRef<any>;

  constructor(
    private programService: ProgramService,
    private scrollService: ScrollService,
    private router: Router,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.type = data.type;
      this.isMe = this.type === 'me';
    });
    this.activatedRoute.params.subscribe(data => {
      this.userId = data.id;
    });
    this.scrollService.scrollChangeEmitted$.subscribe(value => {
      if (value > 90 && !this.alreadyScrolledBottom){
        this.alreadyScrolledBottom = true;
        this.getNextPortfolioPrograms();
      }
    });
    this.getFirstPortfolioPrograms();
    this.getListCodeLanguageAvailable();
    this.programCreationForm = new FormGroup({
      programName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      programLanguageId: new FormControl('', [Validators.required])
    });

    this.modifyProgramForm = new FormGroup({
      programName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  getFirstPortfolioPrograms(): void {
    this.searchingPrograms = true;
    this.isFirstGet = true;
    this.noPrograms = false;
    this.noMore = false;
    this.programsError = '';
    this.programs = [];

    if (this.isMe){
      this.getPortfolioProgramsHandler(this.programService.getMyPortfolioPrograms(this.limit, this.offset));
    }else{
      this.getPortfolioProgramsHandler(this.programService.getUserPortfolioPrograms(this.userId, this.limit, this.offset));
    }
  }

  getNextPortfolioPrograms(): void{
    this.searchingPrograms = true;
    this.getPortfolioProgramsHandler(this.programService.getNextPortfolioPrograms(this.lastRequestResult.next));
  }

  getPortfolioProgramsHandler(requestResult: Observable<PaginatedRequestResultPrograms>): void{
    requestResult.subscribe(
      value => {
        this.lastRequestResult = value;
        this.programs = this.programs.concat(this.lastRequestResult.data);
      },
      error => {
        this.searchingPrograms = false;
        this.programsError = error.message;
      },
      () => {
        this.searchingPrograms = false;
        if (this.lastRequestResult.total < 1 || this.lastRequestResult.next == null) {
          if (this.isFirstGet && this.lastRequestResult.data.length < 1) {
            this.noPrograms = true;
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

  retryGetPrograms(): void {
    this.programsError = null;
    if (this.isFirstGet){
      this.getFirstPortfolioPrograms();
    } else {
      this.getNextPortfolioPrograms();
    }
  }

  getDate(createdAt: string): string {
    return createdAt.split('T')[0];
  }

  editProgram(id: string): void {
    this.router.navigate(['/program/' + id]);
  }

  openDialog(dialog: any): void{
    this.dialog.closeAll();
    this.dialog.open(dialog, {disableClose: true});
  }

  closePopUp(): void {
    this.dialog.closeAll();
    if (this.createProgramSuccess){
      this.getFirstPortfolioPrograms();
      this.createProgramSuccess = false;
    }
    setTimeout(() => {
      this.createProgramError = '';
      this.selectedProgramId = '';
    }, 500);
  }

  openProgramCreationForm(): void {
    this.openDialog(this.creationProgramForm);
  }

  getListCodeLanguageAvailable(): void{
    this.programService.getListCodeLanguageAvailable().subscribe(
      value => {
        const result = value.filter(c => c.id === 7 || c.id === 20);
        this.codeLanguages = result;
      }, error => {
      });
  }

  createProgram(): void {
    const programName = this.programCreationForm.controls.programName.value;
    const languageId = this.programCreationForm.controls.programLanguageId.value;
    this.openDialog(this.awaitingCreationProgram);
    this.programService.createProgram(new ProgramCreation(programName, languageId)).subscribe(
      value => {
        this.createProgramSuccess = true;
        this.programCreationForm.controls.programName.setValue('');
        this.programCreationForm.controls.programLanguageId.setValue('');
        this.programCreationForm.markAsUntouched();
        this.openDialog(this.creationProgramRequestResult);
      },
      error => {
        console.log(error);
        this.createProgramError = error.message;
        this.openDialog(this.creationProgramRequestResult);
      }
    );
  }

  openProgramModificationForm(program: Program): void {
    this.selectedProgramId = program.id;
    this.openDialog(this.modifyProgramName);
  }

  changeProgrameName(): void {
    const programName = this.modifyProgramForm.controls.programName.value;
    this.openDialog(this.awaitingCreationProgram);

    this.programService.changeProgramName(this.selectedProgramId, new ProgramTitle(programName)).subscribe(
      value => {
        this.createProgramSuccess = true;
        this.modifyProgramForm.controls.programName.setValue('');
        this.modifyProgramForm.markAsUntouched();
        this.openDialog(this.creationProgramRequestResult);
      },
      error => {
        console.log(error);
        this.createProgramError = error.message;
        this.openDialog(this.creationProgramRequestResult);
      }
    );
  }


}
