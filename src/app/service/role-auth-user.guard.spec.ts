import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleAuthUserGuard } from './role-auth-user.guard';

describe('roleAuthUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleAuthUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
