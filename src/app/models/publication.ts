export class Publication {
  private _id: string;
  private _content: string;
  private _createdAt: string;
  private _author: Author;

  constructor(id: string, content: string, createdAt: string, author: Author) {
    this._id = id;
    this._content = content;
    this._createdAt = createdAt;
    this._author = author;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  set createdAt(value: string) {
    this._createdAt = value;
  }

  get author(): Author {
    return this._author;
  }

  set author(value: Author) {
    this._author = value;
  }
}

export class Author {
  private _id: string;
  private _username: string;

  constructor(id: string, username: string) {
    this._id = id;
    this._username = username;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
