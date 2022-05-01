export class Login {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  get _email(): string {
    return this.email;
  }

  set _email(value: string) {
    this.email = value;
  }

  get _password(): string {
    return this.password;
  }

  set _password(value: string) {
    this.password = value;
  }
}
