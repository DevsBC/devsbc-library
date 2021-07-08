import { TestBed } from '@angular/core/testing';

import { ErrorInterceptor } from './error-interceptor.service';

describe('ErrorInterceptorService', () => {
  let service: ErrorInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorInterceptor);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
