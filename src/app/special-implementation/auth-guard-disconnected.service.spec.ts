import { TestBed } from '@angular/core/testing';

import { AuthGuardDisconnectedService } from './auth-guard-disconnected.service';

describe('AuthGuardDisconnectedService', () => {
  let service: AuthGuardDisconnectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardDisconnectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
