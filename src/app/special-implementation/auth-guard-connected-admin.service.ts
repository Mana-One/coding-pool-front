import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthentificationService} from '../services/authentification.service';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardConnectedAdminService implements CanActivate{

  constructor(public auth: AuthentificationService, public router: Router, public userService: UserService) {}  canActivate(): boolean {
    if (this.auth.isAuthenticated() && this.userService.isConnectedUserAdmin() === true) {
      return true;
    } else{
      this.router.navigate(['login']);
      return false;
    }
  }
}
