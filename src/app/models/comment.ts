export class Comment {
  private content: string;
  private publicationId: string;

  constructor(content: string, publicationId: string) {
    this.content = content;
    this.publicationId = publicationId;
  }

  get _content(): string {
    return this.content;
  }

  set _content(value: string) {
    this.content = value;
  }

  get _publicationId(): string {
    return this.publicationId;
  }

  set _publicationId(value: string) {
    this.publicationId = value;
  }
}
