export class ChangePassword {
  private oldPassword: string;
  private newPassword: string;
  private confirmPassword: string;

  constructor(oldPassword: string, newPassword: string, confirmPassword: string) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.confirmPassword = confirmPassword;
  }
}
