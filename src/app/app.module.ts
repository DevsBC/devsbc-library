import { environment } from './../environments/environment';
import { DevsbcModule } from './../../projects/devsbc-components/src/lib/devsbc.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccessComponent } from './components/access/access.component';
import { FormComponent } from './components/form/form.component';
import { ThemeComponent } from './components/theme/theme.component';
import { LanguageComponent } from './components/language/language.component';

/* Angular Material */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    AccessComponent,
    FormComponent,
    ThemeComponent,
    LanguageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DevsbcModule.forRoot(environment),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
