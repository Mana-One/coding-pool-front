export class UserStats {
  public id: string;
  public username: string;
  public memberSince: string;
  public followers: number;
  public following: number;
  public programs: number;
  public isFollowing: boolean;
  public competitions_entered: number;
  public competitions_won: number;

  constructor(id: string, username: string, memberSince: string, followers: number, following: number, programs: number, isFollowing: boolean, competitions_entered: number, competitions_won: number) {
    this.id = id;
    this.username = username;
    this.memberSince = memberSince;
    this.followers = followers;
    this.following = following;
    this.programs = programs;
    this.isFollowing = isFollowing;
    this.competitions_entered = competitions_entered;
    this.competitions_won = competitions_won;
  }
}
