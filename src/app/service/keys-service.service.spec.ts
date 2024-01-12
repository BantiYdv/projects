import { TestBed } from '@angular/core/testing';

import { KeysServiceService } from './keys-service.service';

describe('KeysServiceService', () => {
  let service: KeysServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeysServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
