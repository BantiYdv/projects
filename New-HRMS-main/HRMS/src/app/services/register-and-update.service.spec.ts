import { TestBed } from '@angular/core/testing';

import { RegisterAndUpdateService } from './register-and-update.service';

describe('RegisterAndUpdateService', () => {
  let service: RegisterAndUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterAndUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
