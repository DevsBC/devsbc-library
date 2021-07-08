import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

export enum Breakpoints {
  'XS' = 'xs',
  'SM' = 'sm',
  'MD' = 'md',
  'LG' = 'lg',
  'XL' = 'xl'
}

@Injectable({
  providedIn: 'root'
})
export class ScreenBreakpointObserverService {
  xsBreakpoint = ['(max-width:575.98px)'];
  smBreakpoint = ['(min-width:576px) and (max-width:767.98px)'];
  mdBreakpoint = ['(min-width:768px) and (max-width:991.98px)'];
  lgBreakpoint = ['(min-width:992px) and (max-width:1199.98px)'];
  xlBreakpoint = '(min-width:1200px)';

  public screenSizeObserver = new BehaviorSubject<string>('desktop');

  constructor(private breakpointObserver: BreakpointObserver) {
    this.initObservers();
  }

  private initObservers(): void {
    this.breakpointObserver.observe(this.xsBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.screenSizeObserver.next('mobile');
      }
    });
    this.breakpointObserver.observe(this.smBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.screenSizeObserver.next('mobile');
      }
    });
    this.breakpointObserver.observe(this.mdBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.screenSizeObserver.next('mobile');
      }
    });
    this.breakpointObserver.observe(this.lgBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.screenSizeObserver.next('desktop');
      }
    });
    this.breakpointObserver.observe(this.xlBreakpoint).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.screenSizeObserver.next('desktop');
      }
    });
  }
}
