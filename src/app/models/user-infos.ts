export class UserInfos {
  private _id: string;
  private _username: string;
  private _wallet: string;
  private _email: string;
  private _role: string;

  constructor(id: string, username: string, wallet: string, email: string, role: string) {
    this._id = id;
    this._username = username;
    this._wallet = wallet;
    this._email = email;
    this._role = role;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get wallet(): string {
    return this._wallet;
  }

  set wallet(value: string) {
    this._wallet = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }
}
