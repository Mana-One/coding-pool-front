import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ChangePassword} from '../../models/change-password';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ResizedEvent} from 'angular-resize-event';
import {UserInfos} from '../../models/user-infos';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  changePasswordForm: FormGroup;
  hasMajLetter = false;
  hasMinLetter = false;
  hasNumber = false;
  isRequestingChangePassword = false;
  hideOldPassword = true;
  hideNewPassword = true;
  hideConfirmNewPassword = true;
  errorMessage = '';
  userInfos = new UserInfos('null', 'null', 'null', 'null', 'null');
  changePasswordAttemptFailed = false;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initChangePasswordForm();
    this.getUserInfos();
    this.changePasswordForm.controls.confirmNewPassword.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      value => {
        if (value !== this.changePasswordForm.controls.newPassword.value){
          this.changePasswordForm.controls.confirmNewPassword.setErrors({samePassword: true});
        }else{
          this.changePasswordForm.controls.confirmNewPassword.setErrors({samePassword: null});
          this.changePasswordForm.controls.confirmNewPassword.updateValueAndValidity();
        }
      });

    this.changePasswordForm.controls.newPassword.valueChanges.subscribe(
      value => {
        this.checkPasswordRequirements(value);
      });

  }

  getUserInfos(): void {
    this.userService.getConnectedUserInfo().subscribe(
      value => {
        this.userInfos = value;
      },error => {

      });
  }

  initChangePasswordForm(): void{
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$')]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    });
  }

  checkPasswordRequirements(password: string): void {
    this.hasMajLetter = /[A-Z]/.test(password);
    this.hasMinLetter = /[a-z]/.test(password);
    this.hasNumber = /\d/.test(password);
  }

  changeUserPassword(): void {
    if (this.changePasswordForm.valid){
      const cardMessage = document.getElementById('card-message');
      cardMessage.style.opacity = '0';
      this.changePasswordAttemptFailed = false;
      const formValue = this.changePasswordForm.value;
      this.userService.changeUserPassword(new ChangePassword(formValue.oldPassword, formValue.newPassword, formValue.confirmNewPassword))
        .subscribe(
          value => {
            this.errorMessage = 'Password has been successfully edited !';
            cardMessage.classList.remove('card-error');
            cardMessage.classList.add('card-success');
          },
          error => {
            this.errorMessage = error.message;
            this.changePasswordAttemptFailed = true;
            cardMessage.classList.remove('card-success');
            cardMessage.classList.add('card-error');
          }, () => {
            this.isRequestingChangePassword = false;
            cardMessage.style.opacity = '1';
          }
        );
    }
  }

  changeInfosDisposition(event: ResizedEvent): void {
    const accountContainer = document.getElementById('accountContainer');
    const userInfos = document.getElementById('userInfos');
    const separator = document.getElementById('separator');
    const changePassword = document.getElementById('changePassword');
    if (event.newWidth > 960){
      accountContainer.classList.remove('accountContainer-mobile');
      userInfos.classList.remove('col-12');
      separator.classList.remove('col-12');
      changePassword.classList.remove('col-12');
      accountContainer.classList.add('accountContainer-desktop');
      userInfos.classList.add('col-5');
      separator.classList.add('col-2');
      changePassword.classList.add('col-5');
    }else{
      accountContainer.classList.remove('accountContainer-desktop');
      userInfos.classList.remove('col-5');
      separator.classList.remove('col-2');
      changePassword.classList.remove('col-5');
      accountContainer.classList.add('accountContainer-mobile');
      userInfos.classList.add('col-12');
      separator.classList.add('col-12');
      changePassword.classList.add('col-12');
    }
  }

  getFieldErrorMessage(control: string): string{
    if (this.changePasswordForm.controls[control].hasError('required')) {
      return 'this field is required';
    } else if (this.changePasswordForm.controls[control].hasError('samePassword')){
      return 'passwords are differents';
    } else if (this.changePasswordForm.controls[control].hasError('minlength')){
      return this.changePasswordForm.controls[control].errors.minlength.requiredLength + ' characters min';
    } else if (this.changePasswordForm.controls[control].hasError('maxlength')){
      return this.changePasswordForm.controls[control].errors.maxlength.requiredLength + ' characters max';
    } else if (this.changePasswordForm.controls[control].hasError('pattern')){
      return 'you need to respect the password requirements';
    } else{
      return '';
    }
  }

  showPassword(password: string): void {
    switch (password) {
      case 'oldPassword':
        this.hideOldPassword = !this.hideOldPassword;
        break;
      case 'newPassword':
        this.hideNewPassword = !this.hideNewPassword;
        break;
      case 'confirmNewPassword':
        this.hideConfirmNewPassword = !this.hideConfirmNewPassword;
        break;
    }
  }
}
