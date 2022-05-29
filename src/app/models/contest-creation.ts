export class ContestCreation {
  public title: string;
  public description: string;
  public startDate: string;
  public endDate: string;
  public languageId: number;
  public stdin: string;
  public expectedStdout: string;

  constructor(title: string, description: string, startDate: string, endDate: string,
              languageId: number, stdin: string, expectedStdout: string) {
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.languageId = languageId;
    this.stdin = stdin;
    this.expectedStdout = expectedStdout;
  }
}
