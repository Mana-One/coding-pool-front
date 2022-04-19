import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  manageVeil(): void {
    const navContent = document.getElementById('nav-content');
    const veil = document.getElementById('veil');
    if (navContent.classList.contains('show')){
      veil.style.opacity = '0';
      veil.style.zIndex = '-1';
    }else {
      veil.style.opacity = '1';
      veil.style.zIndex = '1';
    }
  }

  closeExpendedBar(): void {
    const toggler = document.getElementById('toggler');
    toggler.click();
  }
}
