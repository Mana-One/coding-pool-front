export class ProgramSubmission {
  public source_code: string;
  public language_id: number;
  public stdin: string;

  constructor(source_code: string, language_id: number, stdin: string) {
    this.source_code = source_code;
    this.language_id = language_id;
    this.stdin = stdin;
  }
}
