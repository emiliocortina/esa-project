import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginObject} from './/login-object';
import {SignUpObject} from './SignUpObject';
import {Session} from './session';

import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {


    constructor(private http: HttpClient) {
    }

    private basePath = 'http://192.168.0.11:3000/auth/';

    login(loginObj: LoginObject): Observable<Session> {

        return this.http.post(this.basePath + 'login', loginObj).pipe(map(data => this.extractData(data)));
    }

    // tslint:disable-next-line:ban-types
    logout(): Observable<Boolean> {
        return this.http.post(this.basePath + 'logout', {}).pipe(map(data => this.extractData(data)));
    }

    signup(signUpObject: SignUpObject): Observable<Session> {
        return this.http.post('http://localhost:3000/auth/signup', signUpObject).pipe(map(data => this.extractData(data)));
        //return this.http.post(this.basePath + 'signup', signUpObject).pipe(map(data => this.extractData(data)));
    }

    private extractData(res: any) {
        return res;
    }


}
