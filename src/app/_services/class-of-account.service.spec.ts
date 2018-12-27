import { TestBed } from '@angular/core/testing';

import { ClassOfAccountService } from './class-of-account.service';

describe('ClassOfAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassOfAccountService = TestBed.get(ClassOfAccountService);
    expect(service).toBeTruthy();
  });
});
