import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SocialNetworkService} from '../../services/social-network.service';
import {ScrollService} from '../../services/scroll.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {PaginatedRequestResultComment, PaginatedRequestResultPublication} from '../../models/paginated-request-result-publication';
import {PaginatedRequestContentComment, PaginatedRequestContentPublication} from '../../models/paginatedRequestContentPublication';
import {Publication} from '../../models/publication';
import {Comment} from '../../models/comment';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PublicationCreation} from '../../models/publicationCreation';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss', '../board/board.component.scss']
})
export class PublicationComponent implements OnInit {

  type: string;
  publicationId: string;
  publication: Publication;
  publicationError: string;
  comments: PaginatedRequestContentComment[] = [];
  lastRequestResult: PaginatedRequestResultComment;
  alreadyScrolledBottom = false;
  isFirstGet = true;
  searchingComments = false;
  noComment = false;
  noMore = false;
  commentError: string;
  addCommentError: string;
  addCommentSuccess = false;
  offset = 0;
  limit = 10;
  commentForm: FormGroup;

  @ViewChild('awaitingCommentRequestSend', { static: true }) awaitingCommentRequestSend: TemplateRef<any>;
  @ViewChild('creationCommentRequestResult', { static: true }) creationCommentRequestResult: TemplateRef<any>;


  constructor(
    private socialNetworkService: SocialNetworkService,
    private scrollService: ScrollService,
    private router: ActivatedRoute,
    private dialog: MatDialog,
    private userService: UserService,
  ) { }



  ngOnInit(): void {
    this.publicationId = this.router.snapshot.paramMap.get('id');
    this.scrollService.scrollChangeEmitted$.subscribe(value => {
      if (value > 90 && !this.alreadyScrolledBottom){
        this.alreadyScrolledBottom = true;
        this.getNextComments();
      }
    });
    this.getPublication();
    this.getFirstComments();
    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  getPublication(): void {
    this.publicationError = null;
    this.socialNetworkService.getPublication(this.publicationId).subscribe(
      value => {
        this.publication = value;
      }
      , error  => {
        this.publicationError = error.message;
      });
  }

  getFirstComments(): void {
    this.searchingComments = true;
    this.isFirstGet = true;
    this.noComment = false;
    this.noMore = false;
    this.commentError = '';
    this.comments = [];
    this.getCommentHandler(this.socialNetworkService.publicationComments(this.publicationId, this.limit, this.offset));
  }

  getNextComments(): void{
    this.searchingComments = true;
    this.getCommentHandler(this.socialNetworkService.getNextPaginatedRequestComment(this.lastRequestResult.next));
  }

  getCommentHandler(requestResult: Observable<PaginatedRequestResultComment>): void{
    requestResult.subscribe(
      value => {
        this.lastRequestResult = value;
        this.comments = this.comments.concat(this.lastRequestResult.data);
      },
      error => {
        this.searchingComments = false;
        this.commentError = error.message;
      },
      () => {
        this.searchingComments = false;
        if (this.lastRequestResult.total < 1 || this.lastRequestResult.next == null) {
          if (this.isFirstGet && this.lastRequestResult.data.length < 1) {
            this.noComment = true;
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

  retryGetComments(): void {
    this.commentError = null;
    if (this.isFirstGet){
      this.getFirstComments();
    } else {
      this.getNextComments();
    }
  }

  like(): void {
    if (this.publication.isLiked){
      this.socialNetworkService.unLikePublication(this.publicationId).subscribe(value => {
        this.publication.likes--;
        this.publication.isLiked = !this.publication.isLiked;
      }, error => {});
    }else {
      this.socialNetworkService.likePublication(this.publicationId).subscribe(value => {
        this.publication.likes++;
        this.publication.isLiked = !this.publication.isLiked;
      }, error => {});
    }
  }

  getDate(createdAt: string): string {
    return createdAt.split('T')[0];
  }

  commentPublication(): void {
    const commentText = this.commentForm.controls.comment.value;
    this.openDialog(this.awaitingCommentRequestSend);
    this.socialNetworkService.commentPublication(new Comment(commentText, this.publicationId)).subscribe(
      value => {
        this.addCommentSuccess = true;
        this.commentForm.controls.comment.setValue('');
        this.commentForm.markAsUntouched();
        this.openDialog(this.creationCommentRequestResult);
      },
      error => {
        console.log(error);
        this.addCommentError = error.message;
        this.openDialog(this.creationCommentRequestResult);
      }
    );
  }

  openDialog(dialog: any): void{
    this.dialog.closeAll();
    this.dialog.open(dialog, {disableClose: true});
  }

  closePopUp(): void {
    this.dialog.closeAll();
    if (this.addCommentSuccess){
      this.getFirstComments();
      this.addCommentSuccess = false;
    }
    setTimeout(() => {
      this.addCommentError = '';
    }, 500);
  }
}
