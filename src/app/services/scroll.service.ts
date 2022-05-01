import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private scrollChange = new Subject<number>();
  constructor() { }
  scrollChangeEmitted$ = this.scrollChange.asObservable();

  scrollPage(scrollPercentage: number): void {
    this.scrollChange.next(scrollPercentage);
  }
}
