import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginObject } from './/login-object';
import { SignUpObject } from './SignUpObject';
import { Session } from './session';

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	constructor(private http: HttpClient, private apiService: ApiService) {}

	login(loginObj: LoginObject): Observable<Session> {
		return this.apiService
			.request('auth/login', 'post', null, loginObj)
			.pipe(map((data) => this.extractData(data)));
	}
	// tslint:disable-next-line:ban-types
	logout(): Observable<Boolean> {
		return this.apiService.request('auth/logout', 'post').pipe(map((data) => this.extractData(data)));
	}

	signup(signUpObject: SignUpObject): Observable<Session> {
		return this.apiService
			.request('auth/signup', 'post', null, JSON.stringify(signUpObject))
			.pipe(map((data) => this.extractData(data)));
	}

	private extractData(res: any) {
		return res;
	}
}
