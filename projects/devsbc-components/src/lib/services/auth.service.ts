import { AccessAuthModel } from './../models/access-auth.model';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sessionName = this.env.sessionName || 'my-session-name';
  private isMultiSession = this.env.multiSession || false;
  private onlyToken = this.env.sessionEncrypted|| false;

  constructor(private http: HttpClient, private router: Router, @Inject('env') private env: any) {}

  public async signUp(endpoint: string, user: any): Promise<void> {
    // User for your model in database in Token by JSONWebToken
    const token = await lastValueFrom(this.http.post<string>(endpoint, user));

    let session: any;
    if (this.onlyToken) {
      session = token;
    } else {
      session = this.decryptSession(token);
      session.access_token = token;
    }
    this.saveSession(session);
  }

  public async signIn(endpoint: string, user: any): Promise<void> {
    const token = await lastValueFrom(this.http.post<string>(endpoint, user));
    let session: any;
    if (this.onlyToken) {
      session = token;
    } else {
      session = this.decryptSession(token);
      session.access_token = token;
    }
    this.saveSession(session);
  }

  public recoverPassword(endpoint: string, email: string): Promise<any> {
    // tslint:disable-next-line: max-line-length
    // You can return the data for recover, however i recommend you, send email to your customer and create a new flow based in URL tokenized
    return lastValueFrom(this.http.post<any>(endpoint, { email }));
  }

  /* OPTIONAL */
  public verifyToken(endpoint: string, token: string): Promise<any> {
    // Use this http call for verify token in your server
    return lastValueFrom(this.http.post<any>(endpoint, { token }));
  }

  public updatePassword(endpoint: string, email: string, password: string): Promise<any> {
    return lastValueFrom(this.http.post<any>(endpoint, { email, password }));
  }

  /* ACCESS TO RESTRICTED ZONES */
  // Data can be any object that use for verify or the user session
  public async isAdmin(endpoint: string, data: any): Promise<any> {
    // Use this http call for verify if user has permission
    return await lastValueFrom(this.http.post<any>(endpoint, data));
  }

  /* Use this in your Guards */
  public isAuthenticated(): boolean {
    if (this.sessionName) {
      if (this.isMultiSession) {
        return sessionStorage.getItem(this.sessionName) ? true : false;
      } else {
        return localStorage.getItem(this.sessionName) ? true : false;
      }
    } else {
      console.log('Session Name is not defined, please login again');
      return false;
    }
  }

  /* Get the Session Object */
  public getSession(): any {
    let session: any;
    if (this.isAuthenticated()) {
      if (this.isMultiSession) {
        session = JSON.parse(sessionStorage.getItem(this.sessionName) || '');
      } else {
        session = JSON.parse(localStorage.getItem(this.sessionName) || '');
      }

      return (this.onlyToken) ? this.decryptSession(session) : session;

    } else {
      return null;
    }
  }

  public getToken(): string {
    const session = this.getSession();
    const token = (this.onlyToken) ? session : session?.access_token;
    return token || '';
  }

  public logout(urlToRedirect?: string): void {
    if (this.isMultiSession) {
      sessionStorage.removeItem(this.sessionName);
    } else {
      localStorage.removeItem(this.sessionName);
    }
    this.router.navigateByUrl(urlToRedirect || '/login');
  }

  private saveSession(session: any): void {
    session = this.onlyToken ? session : JSON.stringify(session)
    try {
      if (session) {
        if (this.isMultiSession) {
          sessionStorage.setItem(this.sessionName, session);
        } else {
          localStorage.setItem(this.sessionName, session);
        }
      } else {
        throw new Error('Session is not defined');
      }
    } catch (error) {
      throw error;
    }
  }

  private decryptSession(token: string): any {
    const base64 = token.split('.')[1];
    const data = JSON.parse(window.atob(base64));
    return data.user;
  }

}
