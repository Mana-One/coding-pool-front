import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SocialNetworkService} from '../../services/social-network.service';
import {PaginatedRequestContentPublication} from '../../models/paginatedRequestContentPublication';
import {PaginatedRequestResultPublication} from '../../models/paginated-request-result-publication';
import {ScrollService} from '../../services/scroll.service';
import {PublicationCreation} from '../../models/publicationCreation';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Publication} from '../../models/publication';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChild('publicationDialog', { static: true }) PublicationDialog: TemplateRef<any>;
  @ViewChild('awaitingPublicationRequestSend', { static: true }) awaitingPublicationRequestSend: TemplateRef<any>;
  @ViewChild('creationPublicationRequestResult', { static: true }) creationPublicationRequestResult: TemplateRef<any>;

  type: string;
  userId: string;
  publications: Publication[] = [];
  lastRequestResult: PaginatedRequestResultPublication;
  alreadyScrolledBottom = false;
  isFirstGet = true;
  searchingPublication = false;
  noPublication = false;
  noMore = false;
  error: string;
  addPublicationError: string;
  addPublicationSuccess = false;
  offset = 0;
  limit = 10;
  publicationForm: FormGroup;

  constructor(
    private dialog: MatDialog,
    private socialNetworkService: SocialNetworkService,
    private scrollService: ScrollService,
    private router: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.router.data.subscribe(data => {
      this.type = data.type;
    });
    this.router.params.subscribe(data => {
      this.userId = data.id;
    });

    this.scrollService.scrollChangeEmitted$.subscribe(value => {
      if (value > 90 && !this.alreadyScrolledBottom){
        this.alreadyScrolledBottom = true;
        this.getNextPublications();
      }
    });
    this.getFirstPublications();
    this.publicationForm = new FormGroup({
      publication: new FormControl('', [Validators.required, Validators.minLength(30)])
    });
  }

  getFirstPublications(): void {
    this.isFirstGet = true;
    this.noPublication = false;
    this.noMore = false;
    this.error = '';
    this.publications = [];
    this.searchingPublication = true;
    switch (this.type) {
      case 'home':
        this.getPublicationHandler(this.socialNetworkService.homePublication(this.limit, this.offset));
        break;
      case 'me':
        this.getPublicationHandler(this.socialNetworkService.myPublications(this.limit, this.offset));
        break;
      case 'user':
        this.getPublicationHandler(this.socialNetworkService.userPublication(this.userId, this.limit, this.offset));
        break;
      default:
        this.getPublicationHandler(this.socialNetworkService.myPublications(this.limit, this.offset));
        break;
    }
  }

  getNextPublications(): void{
    this.searchingPublication = true;
    this.getPublicationHandler(this.socialNetworkService.getNextPaginatedRequestResultPublication(this.lastRequestResult.next));
  }

  getPublicationHandler(requestResult: Observable<PaginatedRequestResultPublication>): void{
    requestResult.subscribe(
      value => {
        this.lastRequestResult = value;
        this.publications = this.publications.concat(this.lastRequestResult.data);
      },
      error => {
        this.searchingPublication = false;
        this.error = error.message;
      },
      () => {
        this.searchingPublication = false;
        if (this.lastRequestResult.data.length < 1 || this.lastRequestResult.next == null) {
          if (this.isFirstGet && this.lastRequestResult.data.length < 1) {
            this.noPublication = true;
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

  openPublicationDialog(): void {
    this.dialog.open(this.PublicationDialog, {
      disableClose: true,
      maxWidth: 'auto',
      minWidth: '50%',
      maxHeight: 'auto',
      minHeight: '60%',
      panelClass: 'dialog-container-custom'
    });
  }

  retryGetPublication(): void {
    this.error = null;
    if (this.isFirstGet){
      this.getFirstPublications();
    } else {
      this.getNextPublications();
    }
  }

  closePopUp(): void {
    this.dialog.closeAll();
    if (this.addPublicationSuccess && this.type === 'me'){
      this.getFirstPublications();
      this.addPublicationSuccess = false;
    }
    setTimeout(() => {
      this.addPublicationError = '';
    }, 500);
  }

  createPublication(): void {
    const publicationText = this.publicationForm.controls.publication.value;
    this.openDialog(this.awaitingPublicationRequestSend);
    this.socialNetworkService.createPublication(new PublicationCreation(publicationText)).subscribe(
      value => {
        this.addPublicationSuccess = true;
        this.publicationForm.controls.publication.setValue('');
        this.openDialog(this.creationPublicationRequestResult);
      },
      error => {
        console.log(error);
        this.addPublicationError = error.message;
        this.openDialog(this.creationPublicationRequestResult);
      }
    );
  }

  openDialog(dialog: any): void{
    this.dialog.closeAll();
    this.dialog.open(dialog, {disableClose: true});
  }

  getDate(createdAt: string): string {
    return createdAt.split('T')[0];
  }
}
