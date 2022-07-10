import {AfterContentInit, AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {ScrollService} from '../../services/scroll.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-connected-user-page-layout',
  templateUrl: './connected-user-page-layout.component.html',
  styleUrls: ['./connected-user-page-layout.component.scss']
})
export class ConnectedUserPageLayoutComponent implements OnInit, AfterContentInit {

  sideBarHalfExpended = false;
  sideBarExpended = true;
  sideBarPosition = 'start';
  sideBarMode = 'side';
  backDrop = false;
  showReduce = true;
  mybutton;
  content;
  contents;
  scrollHiddenPages = ['/program'];
  scrollHidden = false;
  userMode: string;
  userPicture: string;
  screenSize: number;

  constructor(
    private scrollService: ScrollService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.userMode = data.role;
    });
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isScrollHidden();
      }
    });
    this.userPicture = this.userService.getProfilPicture() ;
    this.userPicture = this.userPicture == 'null' ? null : this.userPicture;

    const dummyEvent = {
      target: {
        innerWidth: window.innerWidth
      }
    };
    this.onResizeScreen(dummyEvent);
    this.content = document.getElementById('content');
    this.contents = document.getElementById('contents');
  }

  ngAfterContentInit(): void {
    this.isScrollHidden();
  }

  isScrollHidden(): void {
    const url = this.router.url;
    this.scrollHiddenPages.forEach(value => {
      if (url.includes(value)){
        this.scrollHidden = true;
      }
    });
    if (this.scrollHidden === false){
      this.mybutton = document.getElementById('btn-back-to-top');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResizeScreen(event): void {
    this.screenSize = event.target.innerWidth;
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
      this.reduceSideBar();
    }
  }

  reduceSideBar(): void {
    this.sideBarExpended = false;
    setTimeout(() => {
      if (this.screenSize > 500){
        this.sideBarHalfExpended = true;
      }
    }, 500);
  }

  extendSideBar(): void {
    this.sideBarHalfExpended = false;
    setTimeout(() => {
      if (this.screenSize > 500){
        this.sideBarExpended = true;
      }
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

  scrollFunction(): void {
    if (this.scrollHidden === false && this.mybutton){
      this.calculateScrollPercentage();
      if (this.content.scrollTop > 20) {
        this.mybutton.style.display = 'block';
      } else {
        this.mybutton.style.display = 'none';
      }
    }
  }

  backToTop(): void {
    this.content.scrollTo({top: 0, behavior: 'smooth'});
  }

  calculateScrollPercentage(): void{
    const scrollPercent = (this.content.scrollTop / (this.contents.scrollHeight - this.content.offsetHeight)) * 100;
    this.scrollService.scrollPage(scrollPercent);
  }

}
