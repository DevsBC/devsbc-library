import { environment } from 'src/environments/environment';
export class ServerModel {
  private server = environment.server;
  private version?: string;
  private app: string;
  private url: string;
  private mode: string;

  constructor(mode: string, app: string, version?: number) {
    this.mode = '/' + mode;
    this.app = '/' + app;
    if (version) {
      this.version = '/' + version;
      this.url = this.server +  this.version + this.app + this.mode;
    } else {
      this.url = this.server + this.app + this.mode;
    }
  }

  public getBaseUrl(endpoint?: string): string {
    return this.url + ((endpoint) ? '/' + endpoint : '');
  }
}
