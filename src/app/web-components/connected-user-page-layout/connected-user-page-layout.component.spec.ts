import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedUserPageLayoutComponent } from './connected-user-page-layout.component';

describe('ConnectedUserPageLayoutComponent', () => {
  let component: ConnectedUserPageLayoutComponent;
  let fixture: ComponentFixture<ConnectedUserPageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectedUserPageLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedUserPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
