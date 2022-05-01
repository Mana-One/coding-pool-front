export class PublicationCreation {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  get _content(): string {
    return this.content;
  }

  set _content(value: string) {
    this.content = value;
  }
}
