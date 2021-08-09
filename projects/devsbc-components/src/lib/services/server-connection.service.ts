import { ModeService } from './mode.service';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {

  private server = this.env.server;
  private version?: number;
  private app!: string;
  private mode = 'test';

  constructor(private modeService: ModeService,  @Inject('env') private env: any) { }

  public initServerConnection(app: string, endpoint: string, version?: number): string {
    this.mode = this.modeService.getMode();
    this.init(app, version);
    const baseUrl = this.getBaseUrl(endpoint);
    return baseUrl;
  }

  private init(app: string, version?: number) {
    this.app = '/' + app;
    if (version) {
      this.version = version;
    }
  }

  private getBaseUrl(endpoint?: string): string {
    let url: string;
    if (this.version) {
      url = this.server +  '/' + this.version + this.app + '/' + this.mode;
    } else {
      url = this.server + this.app + + '/' + this.mode;
    }
    return url + ((endpoint) ? '/' + endpoint : '');
  }
}
