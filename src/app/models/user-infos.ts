export class UserInfos {
  public id: string;
  public username: string;
  public wallet: string;
  public email: string;
  public role: string;

  constructor(id: string, username: string, wallet: string, email: string, role: string) {
    this.id = id;
    this.username = username;
    this.wallet = wallet;
    this.email = email;
    this.role = role;
  }
}
