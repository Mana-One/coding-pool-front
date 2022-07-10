import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ChangePassword} from '../../models/change-password';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ResizedEvent} from 'angular-resize-event';
import {UserInfos} from '../../models/user-infos';
import {MatDialog} from '@angular/material/dialog';
import {RegisterService} from '../../services/register.service';
import {ProgramCreation} from '../../models/program-creation';
import {EditAccount} from '../../models/edit-account';

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
  modifyAccountError: string;
  editAccountForm: FormGroup;
  modifyAccountSuccess = false;

  @ViewChild('ModifyAccountForm', { static: true }) ModifyAccountForm: TemplateRef<any>;
  @ViewChild('awaitingModifyAccount', { static: true }) awaitingModifyAccount: TemplateRef<any>;
  @ViewChild('ModifyAccountRequestResult', { static: true }) ModifyAccountRequestResult: TemplateRef<any>;


  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private registerService: RegisterService
  ) { }

  ngOnInit(): void {
    this.initChangePasswordForm();
    this.initEditAccountForm();
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

    this.editAccountForm.controls.newUserName.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      value => {
        this.registerService.checkUserName(this.editAccountForm.controls.newUserName.value).subscribe(
          response => {
            if (response.isUsernameUsed){
              this.editAccountForm.controls.newUserName.setErrors({usedUsername: true});
            }else{
              this.editAccountForm.controls.newUserName.setErrors({usedUsername: null});
              this.editAccountForm.controls.newUserName.updateValueAndValidity();
            }
          }, error => {
            console.log(error);
          });
      });

  }

  getUserInfos(): void {
    this.userService.getConnectedUserInfo().subscribe(
      value => {
        this.userInfos = value;
      }, error => {

      });
  }

  initChangePasswordForm(): void{
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$')]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    });
  }

  initEditAccountForm(): void{
    this.editAccountForm = new FormGroup({
      newUserName: new FormControl('', [ Validators.minLength(3), Validators.maxLength(32)]),
      newEmail: new FormControl('', [ Validators.email]),
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
      this.isRequestingChangePassword = true;
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
            this.isRequestingChangePassword = false;
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

  getFieldErrorMessageEditAccount(control: string): string{
    if (this.editAccountForm.controls[control].hasError('required')) {
      return 'this field is required';
    } else if (this.editAccountForm.controls[control].hasError('minlength')){
      return this.editAccountForm.controls[control].errors.minlength.requiredLength + ' characters min';
    } else if (this.editAccountForm.controls[control].hasError('maxlength')){
      return this.editAccountForm.controls[control].errors.maxlength.requiredLength + ' characters max';
    } else if (this.editAccountForm.controls[control].hasError('email')){
      return 'e-mail format is not valid';
    } else if (this.editAccountForm.controls[control].hasError('usedUsername')){
      return 'this username is already used';
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

  openDialog(dialog: any): void{
    this.dialog.closeAll();
    this.dialog.open(dialog, {disableClose: true});
  }

  closePopUp(): void {
    this.dialog.closeAll();
    if (this.modifyAccountSuccess){
      this.initEditAccountForm();
      this.modifyAccountSuccess = false;
      location.reload();
    }
    setTimeout(() => {
      this.modifyAccountError = null;
    }, 500);
  }


  openEditAccountDialog(): void {
    this.openDialog(this.ModifyAccountForm);
  }


  editAccount(): void {
    const newUsername = this.editAccountForm.controls.newUserName.value;
    const newEmail = this.editAccountForm.controls.newEmail.value;
    if ( (newUsername === '' || newUsername === null) &&
      (newEmail === '' || newEmail === null) ){
      this.closePopUp();
      return;
    }
    this.openDialog(this.awaitingModifyAccount);
    this.userService.changeUserInformations(new EditAccount(newUsername, newEmail, '')).subscribe(
      value => {
        this.modifyAccountSuccess = true;
        this.editAccountForm.controls.newUserName.setValue('');
        this.editAccountForm.controls.newEmail.setValue('');
        this.editAccountForm.markAsUntouched();
        this.openDialog(this.ModifyAccountRequestResult);
      },
      error => {
        console.log(error);
        this.modifyAccountError = error.message;
        this.openDialog(this.ModifyAccountRequestResult);
      }
    );
  }
}
