import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  exceptions: string[] = ['storage.googleapis'];
  constructor(public auth: AuthService) {}


  setExceptions(exceptions: string[]): void {
    this.exceptions = exceptions;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);
    if (!this.exceptions.some(v => request.url.includes(v))) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
    } else {
    }
    return next.handle(request);
  }

}
