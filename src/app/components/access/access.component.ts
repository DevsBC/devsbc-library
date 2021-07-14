import { AccessAuthModel } from './../../../../projects/devsbc-components/src/lib/models/access-auth.model';
import { environment } from 'src/environments/environment';
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
    const mode = this.modeService.getMode(environment.production);
    const server = new ServerModel(mode, app);
    const baseUrl = server.getBaseUrl(endpoint);
    return baseUrl;
  }

  public async signIn(): Promise<void> {
    const user = { email: 'juan.aranda@injectronic.com', password: 'injectronic' };
    const endpoint = 'https://storage.googleapis.com/injectronic_apps';  //this.baseUrl + '/signin';


    // the function saves the session
    await this.authService.signIn(endpoint, user);
    // show message
    // redirect
    // some stuff
  }

  public async signUp(): Promise<void> {
    const user = { email: '', password: '', username: '', role: '' };
    const endpoint = this.baseUrl + '/signup';

    // the function saves the session
    await this.authService.signUp(endpoint, user);
    // show message
    // redirect
    // some stuff
  }
}
