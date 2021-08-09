import { ServerModel } from './../../models/server.model';
import { ModeService } from './../../../../projects/devsbc-components/src/lib/services/mode.service';
import { AuthService } from './../../../../projects/devsbc-components/src/lib/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  /* EXAMPLE FOR AUTH SERVICE */
  baseUrl!: string;
  sessionName = 'my-session-name';

  constructor(private authService: AuthService, private modeService: ModeService) {}

  ngOnInit(): void {
    // Init URL for Access
    this.baseUrl = this.initServerConnection('ip', 'access');

    // Enable this to test
    this.signIn();
  }



  public initServerConnection(app: string, endpoint: string): string {
    const mode = this.modeService.getMode();
    const server = new ServerModel(mode, app);
    const baseUrl = server.getBaseUrl(endpoint);
    return baseUrl;
  }

  public async signIn(): Promise<void> {
    const user = { email: 'juan.aranda@injectronic.com', password: 'injectronic' };
    const endpoint = 'https://storage.googleapis.com/injectronic_apps';  //this.baseUrl + '/signin';
    await this.authService.signIn(endpoint, user);
  }

  public async signUp(): Promise<void> {
    const user = { email: '', password: '', username: '', role: '' };
    const endpoint = this.baseUrl + '/signup';
    await this.authService.signUp(endpoint, user);
  }
}
