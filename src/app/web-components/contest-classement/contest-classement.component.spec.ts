import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestClassementComponent } from './contest-classement.component';

describe('ContestClassementComponent', () => {
  let component: ContestClassementComponent;
  let fixture: ComponentFixture<ContestClassementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContestClassementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestClassementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
