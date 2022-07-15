import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterService} from '../../services/register.service';
import {Register} from '../../models/register';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  registerForm: FormGroup;
  hidePassword = true;
  hasMajLetter = false;
  hasMinLetter = false;
  hasNumber = false;
  registerAttemptFailed = false;
  errorMessage = '';
  isRequestingRegister = false;
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initRegisterForm();

    this.registerForm.controls.userName.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      value => {
        this.registerService.checkUserName(this.registerForm.controls.userName.value).subscribe(
          response => {
            if (response.isUsernameUsed){
              this.registerForm.controls.userName.setErrors({usedUsername: true});
            }else{
              this.registerForm.controls.userName.setErrors({usedUsername: null});
              this.registerForm.controls.userName.updateValueAndValidity();
            }
          }, error => {
            console.log(error);
          });
      });

    this.registerForm.controls.password.valueChanges.subscribe(
      value => {
        this.checkPasswordRequirements(value);
      });
  }

  initRegisterForm(): void{
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$')]),
    });
  }

  register(): void{
    if (this.registerForm.valid){
      const cardMessage = document.getElementById('card-message');
      cardMessage.style.opacity = '0';
      this.registerAttemptFailed = false;
      const formValue = this.registerForm.value;
      this.isRequestingRegister = true;
      this.registerService.register(new Register(formValue.email, formValue.userName, formValue.password, null)).subscribe(
        value => {
          this.errorMessage = 'Registration successfully have been done, you will be redirected in a few seconds ...';
          cardMessage.classList.remove('card-error');
          cardMessage.classList.add('card-success');

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 500);
        },
        error => {
          this.errorMessage = error.message;
          this.registerAttemptFailed = true;
          cardMessage.classList.remove('card-success');
          cardMessage.classList.add('card-error');
          this.isRequestingRegister = false;
        }, () => {
          this.isRequestingRegister = false;
          cardMessage.style.opacity = '1';
        }
      );
    }
  }

  checkPasswordRequirements(password: string): void {
    this.hasMajLetter = /[A-Z]/.test(password);
    this.hasMinLetter = /[a-z]/.test(password);
    this.hasNumber = /\d/.test(password);
  }

  getFieldErrorMessage(control: string): string{
    if (this.registerForm.controls[control].hasError('required')) {
      return 'this field is required';
    } else if (this.registerForm.controls[control].hasError('email')){
      return 'e-mail format is not valid';
    } else if (this.registerForm.controls[control].hasError('minlength')){
      return this.registerForm.controls[control].errors.minlength.requiredLength + ' characters min';
    } else if (this.registerForm.controls[control].hasError('maxlength')){
      return this.registerForm.controls[control].errors.maxlength.requiredLength + ' characters max';
    } else if (this.registerForm.controls[control].hasError('pattern')){
      return 'you need to respect the password requirements';
    } else if (this.registerForm.controls[control].hasError('usedUsername')){
      return 'this username is already used';
    } else{
      return '';
    }
  }

  showPassword(): void {
    this.hidePassword = !this.hidePassword;
  }
}
