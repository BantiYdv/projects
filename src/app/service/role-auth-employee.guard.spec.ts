import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { roleAuthEmployeeGuard } from './role-auth-employee.guard';

describe('roleAuthEmployeeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => roleAuthEmployeeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
