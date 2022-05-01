export class PaginatedRequestContentPublication {
  public id: string;
  public content: string;
  public createdAt: string;
  public author: Author;

  constructor(id: string, content: string, createdAt: string, author: Author) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.author = author;
  }

}

export class PaginatedRequestContentComment {
  public id: string;
  public content: string;
  public createdAt: string;
  public leftBy: Author;

  constructor(id: string, content: string, createdAt: string, leftBy: Author) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.leftBy = leftBy;
  }

}

export class Author {
  public id: string;
  public username: string;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }

}
