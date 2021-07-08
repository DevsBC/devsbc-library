import { TestBed } from '@angular/core/testing';

import { StyleManagerService } from './style-manager.service';

describe('StyleManagerService', () => {
  let service: StyleManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleManagerService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
