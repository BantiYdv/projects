import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleAuthAdminGuard } from './role-auth-admin.guard';

describe('roleAuthAdminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleAuthAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
