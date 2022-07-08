export class Program {
  public id: string;
  public title: string;
  public createdAt: string;

  constructor(id: string, title: string, createdAt: string) {
    this.id = id;
    this.title = title;
    this.createdAt = createdAt;
  }
}

export class ProgramData {
  public id: string;
  public title: string;
  public content: string;
  public languageId: number;
  public authorId: string;


  constructor(id: string, title: string, content: string, languageId: number, authorId: string) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.languageId = languageId;
    this.authorId = authorId;
  }
}
