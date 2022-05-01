export class ChangePassword {
  private oldPassword: string;
  private newPassword: string;
  private confirmPassword: string;

  constructor(oldPassword: string, newPassword: string, confirmPassword: string) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }

  get _oldPassword(): string {
    return this.oldPassword;
  }

  set _oldPassword(value: string) {
    this.oldPassword = value;
  }

  get _newPassword(): string {
    return this.newPassword;
  }

  set _newPassword(value: string) {
    this.newPassword = value;
  }

  get _confirmPassword(): string {
    return this.confirmPassword;
  }

  set _confirmPassword(value: string) {
    this.confirmPassword = value;
  }
}
