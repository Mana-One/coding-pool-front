export class Comment {
  private _content: string;
  private _publicationId: string;

  constructor(content: string, publicationId: string) {
    this._content = content;
    this._publicationId = publicationId;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get publicationId(): string {
    return this._publicationId;
  }

  set publicationId(value: string) {
    this._publicationId = value;
  }
}
