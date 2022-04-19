import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthentificationService} from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardConnectedService implements CanActivate{

  constructor(public auth: AuthentificationService, public router: Router) {}  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
