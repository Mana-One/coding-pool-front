import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectedPageLayoutComponent } from './disconnected-page-layout-component.component';

describe('DisconnectedPageLayoutComponentComponent', () => {
  let component: DisconnectedPageLayoutComponent;
  let fixture: ComponentFixture<DisconnectedPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisconnectedPageLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectedPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
