import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthentificationService} from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardDisconnectedService implements CanActivate{

  constructor(public auth: AuthentificationService, public router: Router) {}  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['my-account']);
      return false;
    }
    return true;
  }
}
