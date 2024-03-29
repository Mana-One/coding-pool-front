import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {UserStats} from '../../models/user-stats';
import {ProgramService} from '../../services/program.service';
import {SocialNetworkService} from '../../services/social-network.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  @Input() stateFor = 'me';
  @Input() userId;
  userStats: UserStats;
  error: string;

  constructor(
    private userService: UserService,
    private socialService: SocialNetworkService
  ) {
  }

  panelOpenState = false;
  notMe = false;

  ngOnInit(): void {
    this.getUserState();
    this.notMe = this.stateFor === 'user';
  }

  getUserState(): void {
    this.error = null;
    switch (this.stateFor) {
      case 'home':
        this.handleUserStateGet(this.userService.getConnectedUserStats());
        break;
      case 'me':
        this.handleUserStateGet(this.userService.getConnectedUserStats());
        break;
      case 'user':
        this.handleUserStateGet(this.userService.getUserStats(this.userId));
        break;
      default:
        this.handleUserStateGet(this.userService.getConnectedUserStats());
        break;
    }
  }

  handleUserStateGet(request: Observable<UserStats>): void {
    request.subscribe(value => {
      this.userStats = value;
    }, error => {
      this.error = error.message;
    });
  }

  followUser(): void {
    if (this.userStats.isFollowing){
      this.socialService.unFollowUser(this.userStats.id).subscribe(
        value => {
          this.userStats.isFollowing = false;
        }
      );
    } else {
      this.socialService.followUser(this.userStats.id).subscribe(
        value => {
          this.userStats.isFollowing = true;
        });
    }
  }
}
