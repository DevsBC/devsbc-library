import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
