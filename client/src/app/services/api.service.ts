import { Injectable, HostListener } from '@angular/core';
import { Headers, Http, RequestMethod, Request, RequestOptions } from '@angular/http';
import { HttpClient, HttpRequest, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

import { tap, map } from 'rxjs/operators';

import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';
import { StorageService } from './authentication/storage.service';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	urlLit = 'http://localhost:3000/'; // 'http://cooper-app.herokuapp.com/';
	serverError: string;

	public expired = new BehaviorSubject<boolean>(false); // observable para en caso de error de sesion

	constructor(private httpClient: HttpClient, private router: Router, private storageService: StorageService) {}

	// DEPRECATED puede ser util en algun momento
	// private handleError(error: any): Promise<any> {
	//     // console.error('An error occurred', error); // for demo purposes only
	//     if (error.error) {
	//         if (error.error.details && error.error.details.length > 0) {
	//             this.dialogService.error(this.extractErrorDetails(error.error.details),
	//  error.error.errorDescription, MessageFormat.Html);
	//         } else {
	//             if (error.status == 403) {
	//                 this.dialogService.error(error.message, 'Error');
	//             } else {
	//                 this.dialogService.error(error.error.errorDescription, 'Error');
	//             }
	//         }
	//     }
	//     return Promise.reject(error.message || error);
	// }

	// private extractErrorDetails(details): string {
	//     let result = '';
	//     const table = '<table><tbody>#content#</tbody></table>';

	//     for (const det of details) {
	//         result = `<tr><td><b>${det.errorField}:<b></td><td>${det.errorDescription}</td></tr>`;
	//     }

	//     return table.replace('#content#', result);
	// }

	public setExpiredSession(expired: boolean = false) {
		this.expired.next(expired);
	}

	// Devuelve el valor de una cookie o null si la cookie no existe
	public getCookie(name: string): string {
		const nameLenPlus = name.length + 1;
		return (
			document.cookie
				.split(';')
				.map((c) => c.trim())
				.filter((cookie) => {
					return cookie.substring(0, nameLenPlus) === `${name}=`;
				})
				.map((cookie) => {
					return decodeURIComponent(cookie.substring(nameLenPlus));
				})[0] || null
		);
	}

	private getHeaders(): HttpHeaders {
		let headers = new HttpHeaders({
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS',
			'Content-Type': 'application/json',
			'Accept-Language': 'es'
		});
		// DEPRECATED en algun momento se puede volver a esto
		// const jwt = localStorage.getItem('jwt');

		const jwt = this.storageService.getCurrentToken();
		if (jwt) {
			headers = headers.append('Authorization', `Bearer ${jwt}`);
		}

		return headers;
	}

	public buildSortAndFilterParamrs(fieldsToSort: SortField[], pageElements: number, pageNumber: number) {
		const params: { sort_by: string; page_elements: number; page_number: number } = {
			sort_by: '',
			page_elements: 10,
			page_number: 1
		};

		if (fieldsToSort) {
			let sortBy = '';
			fieldsToSort.forEach((field) => {
				sortBy += `${field.key}(${field.order}),`;
			});
			params.sort_by = sortBy;
		}
		if (pageElements) {
			params.page_elements = pageElements;
		}
		if (pageNumber) {
			params.page_number = pageNumber;
		}

		return params;
	}

	request<R>(
		service: string,
		method: string,
		params?: any,
		body?: any,
		showSpinner: boolean = true,
		options?: RequestOptions
	): Observable<R> {
		const url = this.urlLit + service;
		const complete = () => {};

		return this.direct<R>(method, url, params, body, options).pipe(
			tap(
				(result) => {
					complete();
				},
				(error) => {
					complete();
					// this.handleError(error);
				}
			)
		);
	}

	private direct<R>(method: string, url: string, params: {}, body: {}, options: RequestOptions): Observable<R> {
		const aux = this.getHeaders();
		return this.httpClient
			.request<R>(method, url, {
				headers: this.getHeaders(),
				params,
				body,
				observe: 'response'
			})
			.pipe(
				map((resp: HttpResponse<R>) => {
					return resp.body;
				})
			);
	}
}
