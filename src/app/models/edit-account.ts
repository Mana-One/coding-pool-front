export class EditAccount {
  public username: string;
  public email: string;
  public picture: string;

  constructor(username: string, email: string, picture: string) {
    this.username = username;
    this.email = email;
    this.picture = picture;
  }
}
