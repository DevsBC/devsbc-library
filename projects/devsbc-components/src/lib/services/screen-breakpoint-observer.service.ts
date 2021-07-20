import { BreakpointInterface } from './../models/breakpoint.model';
import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenBreakpointObserverService {
  xsBreakpoint = ['(max-width:575.98px)'];
  smBreakpoint = ['(min-width:576px) and (max-width:767.98px)'];
  mdBreakpoint = ['(min-width:768px) and (max-width:991.98px)'];
  lgBreakpoint = ['(min-width:992px) and (max-width:1199.98px)'];
  xlBreakpoint = '(min-width:1200px)';

  breakpoint: BreakpointInterface = {
    device: 'desktop',
    res: 'xs'
  };

  public screenSizeObserver = new BehaviorSubject<BreakpointInterface>(this.breakpoint);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.initObservers();
  }

  private initObservers(): void {
    this.breakpointObserver.observe(this.xsBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.breakpoint = {
          device: 'mobile',
          res: 'xs'
        };
        this.screenSizeObserver.next(this.breakpoint);
      }
    });
    this.breakpointObserver.observe(this.smBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.breakpoint = {
          device: 'mobile',
          res: 'sm'
        };
        this.screenSizeObserver.next(this.breakpoint);
      }
    });
    this.breakpointObserver.observe(this.mdBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.breakpoint = {
          device: 'mobile',
          res: 'md'
        };
        this.screenSizeObserver.next(this.breakpoint);
      }
    });
    this.breakpointObserver.observe(this.lgBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.breakpoint = {
          device: 'desktop',
          res: 'lg'
        };
        this.screenSizeObserver.next(this.breakpoint);
      }
    });
    this.breakpointObserver.observe(this.xlBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.breakpoint = {
          device: 'desktop',
          res: 'xl'
        };
        this.screenSizeObserver.next(this.breakpoint);
      }
    });
  }
}
