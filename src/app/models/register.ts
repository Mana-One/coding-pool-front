export class Register {
  private email: string;
  private username: string;
  private password: string;


  constructor(email: string, username: string, password: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }

  get _email(): string {
    return this.email;
  }

  set _email(value: string) {
    this.email = value;
  }

  get _username(): string {
    return this.username;
  }

  set _username(value: string) {
    this.username = value;
  }

  get _password(): string {
    return this.password;
  }

  set _password(value: string) {
    this.password = value;
  }
}
