import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from './services/authentification.service';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front-pa-al';

  constructor(
    private authentificationService: AuthentificationService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.authentificationService.removeIfTokenExpired();
    if (this.authentificationService.isAuthenticated()) {
      this.userService.setConnectedUserIdFromToken(this.authentificationService.getToken());
    }
  }
}
