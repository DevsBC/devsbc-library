import { AuthService } from './../../projects/devsbc-components/src/lib/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'AppComponent';
  constructor(private authService: AuthService) {
    this.authService.setSessionName({
      sessionName: 'my-session',
      multiSession: false
    });
  }
}
