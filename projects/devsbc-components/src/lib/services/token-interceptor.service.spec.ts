import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token-interceptor.service';

describe('TokenInterceptorService', () => {
  let service: TokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInterceptor);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
