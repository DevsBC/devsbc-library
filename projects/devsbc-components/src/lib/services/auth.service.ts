import { AccessAuthModel } from './../models/access-auth.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private sessionName!: string;
  private isMultiSession = false;

  constructor(private http: HttpClient, private router: Router) {}

  public async signUp(access: AccessAuthModel): Promise<void> {
    // User for your model in database in Token by JSONWebToken
    const token = await this.http.post<string>(access.endpoint, access.user).toPromise();

    // Decode the User Model
    const base64 = token.split('.')[1];
    const data = JSON.parse(window.atob(base64));

    // The session generated for your server
    const session = data.user;
    session.access_token = token;

    console.log(session);

    this.saveSession(session, access);

  }

  public async signIn(access: AccessAuthModel): Promise<void> {
    const token = await this.http.post<string>(access.endpoint, access.user).toPromise();
    const base64 = token.split('.')[1];
    const data = JSON.parse(window.atob(base64));
    const session = data.user;
    session.access_token = token;
    console.log(session);
    this.saveSession(session, access);
  }

  public async recoverPassword(endpoint: string, email: string): Promise<any> {
    // tslint:disable-next-line: max-line-length
    // You can return the data for recover, however i recommend you, send email to your customer and create a new flow based in URL tokenized
    return await this.http.post<any>(endpoint, { email }).toPromise();
  }

  /* OPTIONAL */
  public async verifyToken(endpoint: string, token: string): Promise<any> {
    // Use this http call for verify token in your server
    return await this.http.post<any>(endpoint, { token }).toPromise();
  }

  public async updatePassword(endpoint: string, email: string, password: string): Promise<any> {
    return await this.http.post<any>(endpoint, { email, password }).toPromise();
  }

  /* ACCESS TO RESTRICTED ZONES */
  // Data can be any object that use for verify or the user session
  public async isAdmin(endpoint: string, data: any): Promise<any> {
    // Use this http call for verify if user has permission
    return await this.http.post<any>(endpoint, data).toPromise();
  }

  /* Use this in your Guards */
  public isAuthenticated(): boolean {
    if (this.isMultiSession) {
      return sessionStorage.getItem(this.sessionName) ? true : false;
    } else {
      return localStorage.getItem(this.sessionName) ? true : false;
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

  private saveSession(session: any, access: AccessAuthModel): void {
    try {
      if (session) {
        this.sessionName = access.sessionName;
        if (access.multiSession) {
          this.isMultiSession = true;
          sessionStorage.setItem(access.sessionName, JSON.stringify(session));
        } else {
          this.isMultiSession = false;
          localStorage.setItem(access.sessionName, JSON.stringify(session));
        }
      } else {
        throw new Error('User is not defined');
      }
    } catch (error) {
      throw error;
    }
  }

}