import { TestBed } from '@angular/core/testing';

import { AuthGuardConnectedService } from './auth-guard-connected.service';

describe('AuthGuardConnectedService', () => {
  let service: AuthGuardConnectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardConnectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
