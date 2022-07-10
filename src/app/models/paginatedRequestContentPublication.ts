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
  public picture: string;
  public isFollowing: boolean;


  constructor(id: string, username: string, picture: string, isFollowing: boolean) {
    this.id = id;
    this.username = username;
    this.picture = picture;
    this.isFollowing = isFollowing;
  }

}

export class Contest {
  public id: string;
  public title: string;
  public startDate: string;
  public endDate: string;

  constructor(id: string, title: string, startDate: string, endDate: string) {
    this.id = id;
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

export class Participant{
  public id: string;
  public username: string;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username;
  }
}

export class Classement {
  public participant: Participant;
  public competitionId: string;
  public time: string;
  public passed: boolean;

  constructor(participant: Participant, competitionId: string, time: string, passed: boolean) {
    this.participant = participant;
    this.competitionId = competitionId;
    this.time = time;
    this.passed = passed;
  }
}

