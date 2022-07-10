export class UserInfos {
  public id: string;
  public username: string;
  public picture: string;
  public email: string;
  public role: string;

  constructor(id: string, username: string, picture: string, email: string, role: string) {
    this.id = id;
    this.username = username;
    this.picture = picture;
    this.email = email;
    this.role = role;
  }
}
