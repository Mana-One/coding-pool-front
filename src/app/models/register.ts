export class Register {
  private email: string;
  private username: string;
  private password: string;
  private picture: string;


  constructor(email: string, username: string, password: string, picture: string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.picture = picture;
  }
}
