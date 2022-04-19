export class Register {
  private _email: string;
  private _username: string;
  private _password: string;

  constructor(email: string, username: string, password: string) {
    this._email = email;
    this._username = username;
    this._password = password;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
