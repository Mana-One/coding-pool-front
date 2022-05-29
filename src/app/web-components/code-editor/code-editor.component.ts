import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as ace from 'ace-builds';
import {ProgramService} from '../../services/program.service';
import {CodeLanguage} from '../../models/code-language';
import {ProgramSubmission} from '../../models/program-submission';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit, AfterViewInit{

  selectedLanguage: number;
  codeLanguages: CodeLanguage[] = [];
  aceEditor: any;
  aceEditorInput: any;
  aceEditorOutput: any;
  progressBar: any;
  backgrounds = ['chrome', 'dracula'];

  @ViewChild('editor') private editor: ElementRef<HTMLElement>;
  @ViewChild('input') private input: ElementRef<HTMLElement>;
  @ViewChild('output') private output: ElementRef<HTMLElement>;

  constructor(
    private programService: ProgramService
  ) { }

  ngOnInit(): void {
    this.getListCodeLanguageAvailable();
  }

  getListCodeLanguageAvailable(): void{
    this.programService.getListCodeLanguageAvailable().subscribe(
      value => {
        this.codeLanguages = value;
      }, error => {
      });
  }

  submitCode(): void{
    const programVariables = this.aceEditorInput.session.getValue();
    const programSubmission = new ProgramSubmission(this.aceEditor.session.getValue(), this.selectedLanguage, programVariables);
    this.showWaitingBar();
    this.programService.submitCode(programSubmission).subscribe(
      value => {
        this.hideWaitingBar();
        this.aceEditorOutput.setValue(value.stdout);
      }, error => {
        this.hideWaitingBar();
      });
  }

  showWaitingBar(): void{
    console.log(this.progressBar);
    console.log(this.progressBar.classList);
    this.progressBar.classList.remove('opacity-none');
      this.progressBar.classList.add('opacity-full');

    console.log(this.progressBar.classList);
  }

  hideWaitingBar(): void{
    this.progressBar.classList.add('opacity-none');
    this.progressBar.classList.remove('opacity-full');
  }


  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.14/src-noconflict');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditorInput = ace.edit(this.input.nativeElement);
    this.aceEditorOutput = ace.edit(this.output.nativeElement);
    this.aceEditorOutput.setReadOnly(true);
    this.aceEditor.session.setValue('Choose a programing langage and let\'s code !');
    this.progressBar = document.getElementById('progressBar');
  }

  resizeEditor(element: HTMLDivElement): void {
    if (element.classList.contains('big-screen')){
      element.classList.remove('big-screen');
      this.editor.nativeElement.classList.remove('code-big-screen');
    } else {
      this.editor.nativeElement.classList.add('code-big-screen');
      element.classList.add('big-screen');
    }
    const elements = document.getElementsByClassName('ace_content').item(0) as HTMLElement;
    elements.style.height = '100%';
  }

  resizeEditorInput(element: HTMLDivElement, subdiv: HTMLDivElement): void {
    if (element.classList.contains('big-screen')){
      element.classList.remove('big-screen');
      subdiv.classList.remove('big-screen');
      element.classList.add('col-12');
      element.classList.add('col-md-4');
      element.classList.add('pl-md-0');
      element.classList.add('px-0');
      element.classList.add('pr-md-2');
      subdiv.classList.add('mt-2');
      this.input.nativeElement.classList.remove('code-big-screen');
    } else {
      element.classList.remove('col-12');
      element.classList.remove('col-md-4');
      element.classList.remove('pl-md-0');
      element.classList.remove('px-0');
      element.classList.remove('pr-md-2');
      subdiv.classList.remove('mt-2');
      element.classList.add('big-screen');
      subdiv.classList.add('big-screen');
      this.input.nativeElement.classList.add('code-big-screen');
    }
    const elements = document.getElementsByClassName('ace_content').item(1) as HTMLElement;
    elements.style.height = '100%';
  }

  resizeEditorOutput(element: HTMLDivElement, subdiv: HTMLDivElement): void {
    if (element.classList.contains('big-screen')){
      element.classList.remove('big-screen');
      subdiv.classList.remove('big-screen');
      element.classList.add('col-12');
      element.classList.add('col-md-8');
      element.classList.add('pr-md-0');
      element.classList.add('px-0');
      element.classList.add('pl-md-2');
      subdiv.classList.add('mt-2');
      this.output.nativeElement.classList.remove('code-big-screen');
    } else {
      element.classList.remove('col-12');
      element.classList.remove('col-md-8');
      element.classList.remove('pr-md-0');
      element.classList.remove('px-0');
      element.classList.remove('pl-md-2');
      subdiv.classList.remove('mt-2');
      element.classList.add('big-screen');
      subdiv.classList.add('big-screen');
      this.output.nativeElement.classList.add('code-big-screen');
    }
    const elements = document.getElementsByClassName('ace_content').item(2) as HTMLElement;
    elements.style.height = '100%';
  }


  changeEditorBackgroundMode(event: any): void {
    this.aceEditor.setTheme('ace/theme/' + event);
    this.aceEditorInput.setTheme('ace/theme/' + event);
    this.aceEditorOutput.setTheme('ace/theme/' + event);
  }
}
