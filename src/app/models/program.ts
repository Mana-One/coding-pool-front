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
