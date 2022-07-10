export class EditAccount {
  public username: string;
  public email: string;
  public picture: any;

  constructor(username: string, email: string, picture: any) {
    this.username = username;
    this.email = email;
    this.picture = picture;
  }
}
