import {Component, HostListener, OnInit} from '@angular/core';
import {AuthentificationService} from '../../services/authentification.service';

@Component({
  selector: 'app-connected-user-page-layout',
  templateUrl: './connected-user-page-layout.component.html',
  styleUrls: ['./connected-user-page-layout.component.scss']
})
export class ConnectedUserPageLayoutComponent implements OnInit {

  sideBarHalfExpended = false;
  sideBarExpended = true;
  sideBarPosition = 'start';
  sideBarMode = 'side';
  backDrop = false;
  showReduce = true;

  constructor(
    private authentificationService: AuthentificationService
  ) { }

  ngOnInit(): void {
    const dummyEvent = {
      target: {
        innerWidth: window.innerWidth
      }
    };
    this.onResizeScreen(dummyEvent);
  }

  @HostListener('window:resize', ['$event'])
  onResizeScreen(event): void {

    if (event.target.innerWidth <= 550){
      this.backDrop = true;
      this.sideBarMode = 'over';
      this.showReduce = false;
      this.closeSideBar();
    } else if (event.target.innerWidth <= 900){
      this.backDrop = true;
      this.sideBarMode = 'over';
      this.showReduce = true;
      if (this.sideBarExpended || !this.sideBarHalfExpended) {
        this.reduceSideBar();
      }
    } else {
      this.backDrop = false;
      this.sideBarMode = 'side';
      this.showReduce = true;
    }
  }

  reduceSideBar(): void {
    this.sideBarExpended = false;
    setTimeout(() => {
      this.sideBarHalfExpended = true;
    }, 500);
  }

  extendSideBar(): void {
    this.sideBarHalfExpended = false;
    setTimeout(() => {
      this.sideBarExpended = true;
    }, 500);
  }

  extendSideBarfast(): void {
    this.sideBarHalfExpended = false;
    this.sideBarExpended = true;
  }

  closeSideBar(): void {
    this.sideBarHalfExpended = false;
    this.sideBarExpended = false;
  }

  logout(): void {
    this.authentificationService.logout();
  }
}
