import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  public getMode(production: boolean): string {
    if (this.existsMode()) {
      return sessionStorage.getItem('mode') || 'prod';
    } else {
      const mode = (production) ? 'prod' : 'test';
      this.setMode(mode, false);
      return mode;
    }
  }

  public setMode(mode: string, reload?: boolean): void {
    sessionStorage.setItem('mode', mode);
    if (reload) { location.reload(); }
  }

  private existsMode(): boolean {
    return sessionStorage.getItem('mode') ? true : false;
  }
}
