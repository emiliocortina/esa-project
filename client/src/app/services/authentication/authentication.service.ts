import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { LoginObject } from './/login-object';
import { SignUpObject } from './SignUpObject';
import { Session } from './session';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor(private http: Http) { }

  private basePath = 'http://localhost:3000/auth/';

  login(loginObj: LoginObject): Observable<Session> {

    return this.http.post(this.basePath + 'login', loginObj).pipe(map(data => this.extractData(data)));
  }

  logout(): Observable<Boolean> {
    return this.http.post(this.basePath + 'logout', {}).pipe(map(data => this.extractData(data)));
  }

  signup(signUpObject: SignUpObject): Observable<Session> {

    return this.http.post(this.basePath + 'signup', signUpObject).pipe(map(data => this.extractData(data)));
  }

  private extractData(res: Response) {

    const body = res.json();

    return body;
  }


}
