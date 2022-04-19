export class ChangePassword {
  private _oldPassword: string;
  private _newPassword: string;
  private _confirmPassword: string;

  constructor(oldPassword: string, newPassword: string, confirmPassword: string) {
    this._oldPassword = oldPassword;
    this._newPassword = newPassword;
    this._confirmPassword = confirmPassword;
  }

  get oldPassword(): string {
    return this._oldPassword;
  }

  set oldPassword(value: string) {
    this._oldPassword = value;
  }

  get newPassword(): string {
    return this._newPassword;
  }

  set newPassword(value: string) {
    this._newPassword = value;
  }

  get confirmPassword(): string {
    return this._confirmPassword;
  }

  set confirmPassword(value: string) {
    this._confirmPassword = value;
  }
}
