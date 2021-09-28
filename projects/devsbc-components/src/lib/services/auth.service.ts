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

  constructor(private http: HttpClient, private router: Router, @Inject('env') private env: any) {}

  public async signUp(endpoint: string, user: any): Promise<void> {
    // User for your model in database in Token by JSONWebToken
    const token = await lastValueFrom(this.http.post<string>(endpoint, user));

    // Decode the User Model
    const base64 = token.split('.')[1];
    const data = JSON.parse(window.atob(base64));

    // The session generated for your server
    const session = data.user;
    session.access_token = token;
    this.saveSession(session);
  }

  public async signIn(endpoint: string, user: any): Promise<void> {
    const token = await lastValueFrom(this.http.post<string>(endpoint, user));
    const base64 = token.split('.')[1];
    const data = JSON.parse(window.atob(base64));
    const session = data.user;
    session.access_token = token;
    console.log(session);
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

  public  updatePassword(endpoint: string, email: string, password: string): Promise<any> {
    return lastValueFrom(this.http.post<any>(endpoint, { email, password }));
  }

  /* ACCESS TO RESTRICTED ZONES */
  // Data can be any object that use for verify or the user session
  public async isAdmin(endpoint: string, data: any): Promise<any> {
    // Use this http call for verify if user has permission
    return await this.http.post<any>(endpoint, data).toPromise();
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
    if (this.isAuthenticated()) {
      if (this.isMultiSession) {
        return JSON.parse(sessionStorage.getItem(this.sessionName) || '');
      } else {
        return JSON.parse(localStorage.getItem(this.sessionName) || '');
      }
    } else {
      return null;
    }
  }

  public getToken(): string {
    const session = this.getSession();
    if (session && session.access_token) {
      return session.access_token;
    } else {
      return '';
    }
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
    try {
      if (session) {
        if (this.isMultiSession) {
          sessionStorage.setItem(this.sessionName, JSON.stringify(session));
        } else {
          localStorage.setItem(this.sessionName, JSON.stringify(session));
        }
      } else {
        throw new Error('User is not defined');
      }
    } catch (error) {
      throw error;
    }
  }

}
