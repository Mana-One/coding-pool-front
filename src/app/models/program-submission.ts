export class ProgramSubmission {
  public source_code: string;
  public language_id: number;

  constructor(source_code: string, language_id: number) {
    this.source_code = source_code;
    this.language_id = language_id;
  }
}
