export class ContestRule {
  public id: string;
  public title: string;
  public description: string;
  public languageId: number;
  public startDate: string;
  public endDate: string;

  constructor(id: string, title: string, description: string, languageId: number, startDate: string, endDate: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.languageId = languageId;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
