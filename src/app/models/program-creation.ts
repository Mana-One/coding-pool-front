export class ProgramCreation {
  public title: string;
  public languageId: number;

  constructor(title: string, languageId: number) {
    this.title = title;
    this.languageId = languageId;
  }
}

export class ProgramTitle {
  public title: string;

  constructor(title: string) {
    this.title = title;
  }
}

export class ProgramContent {
  public content: string;

  constructor(content: string) {
    this.content = content;
  }
}

