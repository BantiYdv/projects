import { TestBed } from '@angular/core/testing';

import { SecretKeysServiceService } from './secret-keys-service.service';

describe('SecretKeysServiceService', () => {
  let service: SecretKeysServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecretKeysServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
