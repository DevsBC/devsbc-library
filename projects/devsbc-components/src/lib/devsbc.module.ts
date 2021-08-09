import { ServerConnectionService } from './services/server-connection.service';
import { ErrorInterceptor } from './services/error-interceptor.service';
import { TokenInterceptor } from './services/token-interceptor.service';

import { DevsbcFormComponent } from './components/devsbc-form/devsbc-form.component';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DevsbcMultilanguageFormComponent } from './components/devsbc-multilanguage-form/devsbc-multilanguage-form.component';

@NgModule({
  declarations: [
    DevsbcFormComponent,
    DevsbcMultilanguageFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    HttpClientModule
  ],
  exports: [
    DevsbcFormComponent,
    DevsbcMultilanguageFormComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DevsbcModule {
  public static forRoot(environment: any): ModuleWithProviders<DevsbcModule> {

    return {
        ngModule: DevsbcModule,
        providers: [
            ServerConnectionService,
            {
                provide: 'env',
                useValue: environment
            }
        ]
    };
}
}
