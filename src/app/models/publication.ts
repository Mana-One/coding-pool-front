import {Author} from './paginatedRequestContentPublication';

export class Publication {
  public id: string;
  public content: string;
  public postedIn: string;
  public createdAt: string;
  public comments: number;
  public likes: number;
  public author: Author;

  constructor(id: string, content: string, postedIn: string, createdAt: string, comments: number, likes: number, author: Author) {
    this.id = id;
    this.content = content;
    this.postedIn = postedIn;
    this.createdAt = createdAt;
    this.comments = comments;
    this.likes = likes;
    this.author = author;
  }
}
