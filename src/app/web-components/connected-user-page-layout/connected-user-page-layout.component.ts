import {AfterContentInit, AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {ScrollService} from '../../services/scroll.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

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

  constructor(
    private scrollService: ScrollService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isScrollHidden();
      }
    });
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

  scrollFunction(): void {
    if (this.scrollHidden === false){
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
