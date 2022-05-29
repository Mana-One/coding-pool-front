import {Author, Contest, PaginatedRequestContentComment, PaginatedRequestContentPublication} from './paginatedRequestContentPublication';
import {Publication} from './publication';
import {Program} from './program';

export class PaginatedRequestResultPublication {
  public total: number;
  public previous: string;
  public next: string;
  public data: Publication[];

  constructor(total: number, previous: string, next: string, data: Publication[]) {
    this.total = total;
    this.previous = previous;
    this.next = next;
    this.data = data;
  }
}

export class PaginatedRequestResultComment {
  public total: number;
  public previous: string;
  public next: string;
  public data: PaginatedRequestContentComment[];

  constructor(total: number, previous: string, next: string, data: PaginatedRequestContentComment[]) {
    this.total = total;
    this.previous = previous;
    this.next = next;
    this.data = data;
  }
}

export class PaginatedRequestResultUsers {
  public total: number;
  public previous: string;
  public next: string;
  public data: Author[];

  constructor(total: number, previous: string, next: string, data: Author[]) {
    this.total = total;
    this.previous = previous;
    this.next = next;
    this.data = data;
  }
}

export class PaginatedRequestResultPrograms {
  public total: number;
  public previous: string;
  public next: string;
  public data: Program[];

  constructor(total: number, previous: string, next: string, data: Program[]) {
    this.total = total;
    this.previous = previous;
    this.next = next;
    this.data = data;
  }
}

export class PaginatedRequestResultContest {
  public total: number;
  public previous: string;
  public next: string;
  public data: Contest[];

  constructor(total: number, previous: string, next: string, data: Contest[]) {
    this.total = total;
    this.previous = previous;
    this.next = next;
    this.data = data;
  }
}
