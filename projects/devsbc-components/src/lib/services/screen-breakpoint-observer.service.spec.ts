import { TestBed } from '@angular/core/testing';

import { ScreenBreakpointObserverService } from './screen-breakpoint-observer.service';

describe('ScreenBreakpointObserverService', () => {
  let service: ScreenBreakpointObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenBreakpointObserverService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
