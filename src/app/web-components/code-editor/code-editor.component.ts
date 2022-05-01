import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as ace from 'ace-builds';
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.css']
})
export class CodeEditorComponent implements OnInit, AfterViewInit{

  @ViewChild('editor') private editor: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue('<h1>Ace Editor works great in Angular!</h1>');
  }

}
