import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Author} from '../../models/paginatedRequestContentPublication';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {PaginatedRequestResultUsers} from '../../models/paginated-request-result-publication';
import {ScrollService} from '../../services/scroll.service';
import {Observable} from 'rxjs';
import {SocialNetworkService} from '../../services/social-network.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  offset = 0;
  limit = 10;
  users: Author[] = [];
  userSearchForm: FormGroup;
  usersError: string;
  lastRequestResult: PaginatedRequestResultUsers;
  alreadyScrolledBottom = true;
  isFirstGet = true;
  searchingUsers = false;
  noUsers = false;
  noMore = false;
  emptySearch = true;

  constructor(
    private userService: UserService,
    private scrollService: ScrollService,
    private socialService: SocialNetworkService,
  ) { }

  ngOnInit(): void {
    this.userSearchForm = new FormGroup({
      userName: new FormControl('')
    });

    this.userSearchForm.controls.userName.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(
      value => {
        const userName = this.userSearchForm.controls.userName.value;
        if (userName !== ''){
          this.emptySearch = false;
          this.getFirstUsers(userName);
        } else{
          this.noUsers = false;
          this.noMore = false;
          this.usersError = '';
          this.users = [];
          this.emptySearch = true;
        }
      });
    this.scrollService.scrollChangeEmitted$.subscribe(value => {
      if (value > 90 && !this.alreadyScrolledBottom){
        this.alreadyScrolledBottom = true;
        this.getNextUser();
      }
    });
  }

  getFirstUsers(userName: string): void {
    this.searchingUsers = true;
    this.isFirstGet = true;
    this.noUsers = false;
    this.noMore = false;
    this.usersError = '';
    this.users = [];
    this.getUsersHandler(this.userService.searchUsers(userName, this.limit, this.offset));
  }

  getNextUser(): void{
    this.searchingUsers = true;
    this.getUsersHandler(this.userService.searchNextUsers(this.lastRequestResult.next));
  }

  getUsersHandler(requestResult: Observable<PaginatedRequestResultUsers>): void{
    requestResult.subscribe(
      value => {
        this.lastRequestResult = value;
        this.users = this.users.concat(this.lastRequestResult.data);
      },
      error => {
        this.searchingUsers = false;
        this.usersError = error.message;
      },
      () => {
        this.searchingUsers = false;
        if (this.lastRequestResult.total < 1 || this.lastRequestResult.next == null) {
          if (this.isFirstGet && this.lastRequestResult.data.length < 1) {
            this.noUsers = true;
          }else{
            this.noMore = true;
          }
          this.alreadyScrolledBottom = true;
        }else{
          this.alreadyScrolledBottom = false;
        }
        if (this.isFirstGet){
          this.isFirstGet = !this.isFirstGet;
        }
      });
  }

  retryGetUsers(): void {
    this.usersError = null;
    if (this.isFirstGet){
      const userName = this.userSearchForm.controls.userName.value;
      this.getFirstUsers(userName);
    } else {
      this.getNextUser();
    }
  }


  followUser(user: Author): void {
    if (user.isFollowing){
      this.socialService.unFollowUser(user.id).subscribe(
        value => {
          user.isFollowing = false;
        }
      );
    } else {
      this.socialService.followUser(user.id).subscribe(
        value => {
          user.isFollowing = true;
        });
    }
  }
}
