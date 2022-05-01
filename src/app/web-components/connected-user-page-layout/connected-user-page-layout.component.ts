import {Component, HostListener, OnInit} from '@angular/core';
import {ScrollService} from '../../services/scroll.service';

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
  mybutton;
  content;
  contents;
  constructor(private scrollService: ScrollService) { }

  ngOnInit(): void {
    const dummyEvent = {
      target: {
        innerWidth: window.innerWidth
      }
    };
    this.onResizeScreen(dummyEvent);
    this.mybutton = document.getElementById('btn-back-to-top');
    this.content = document.getElementById('content');
    this.contents = document.getElementById('contents');
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
    this.calculateScrollPercentage();
    if (this.content.scrollTop > 20) {
      this.mybutton.style.display = 'block';
    } else {
      this.mybutton.style.display = 'none';
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
