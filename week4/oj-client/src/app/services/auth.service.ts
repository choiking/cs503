// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { Http, Headers, RequestOptions } from '@angular/http';

(window as any).global = window;

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'iduDNvbsJ9K5sR0-JzjAQ-dFTGVt0Sfm',
    domain: 'cs503forsam.auth0.com',
    responseType: 'token id_token',
    audience: 'https://cs503forsam.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid'
  });

  constructor(public router: Router, private http: Http) {}

  public login(): void {
    return this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }

  
  public getProfile(): any {
    return JSON.parse(localStorage.getItem('profile'));
  }

  public resetPassword() {
    let profile = this.getProfile();
    let url : string = `https://${'cs503forsam.auth0.com'}/dbconnections/change_password`;
    let headers = new Headers({'content-type': 'application/json'});
    let body = {
      client_id: 'iduDNvbsJ9K5sR0-JzjAQ-dFTGVt0Sfm',
      email: profile.email,
      connection: 'Username-Password-Authentication'
    }

    let options = new RequestOptions({ headers: headers });

    this.http.post(url, body, options)
      .toPromise()
      .then(res => console.log(res))
      .catch(this.handleError);
  }

  private handleError(error : any) : Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}