import {Component, OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthentificationService} from '../../services/authentification.service';
import {Login} from '../../models/login';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  socialUser!: SocialUser;
  isLoggedin?: boolean;
  loginForm: FormGroup;
  connexionAttemptFailed = false;
  errorMessage = '';
  isRequestingLogin = false;
  constructor(
    private authentificationService: AuthentificationService,
    private socialAuthService: SocialAuthService,
    private router: Router,
    private userSevice: UserService
  ) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
    this.initLoginForm();
  }

  initLoginForm(): void{
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  login(): void{
    if (this.loginForm.valid){
      this.connexionAttemptFailed = false;
      const formValue = this.loginForm.value;
      this.isRequestingLogin = true;
      this.authentificationService.login(new Login(formValue.email, formValue.password)).subscribe(
        token => {
          console.log(token)
          this.authentificationService.saveToken(token.access_token);
          this.userSevice.setConnectedUserIdFromToken(token.access_token);
          this.router.navigate(['/my-account']);
        },
        error => {
          console.log(error);
          this.errorMessage = error.message;
          if (!this.connexionAttemptFailed){
            this.connexionAttemptFailed = true;
            const cardError = document.getElementById('card-error');
            cardError.style.opacity = '1';
          }
        }, () => this.isRequestingLogin = false
      );
    }
  }

  getFieldErrorMessage(control: string): string{
    if (this.loginForm.controls[control].hasError('required')) {
      return 'this field is required';
    } else if (this.loginForm.controls[control].hasError('email')){
      return 'e-mail format is not valid';
    } else{
      return '';
    }
  }
}
