import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { CoopObject } from './CoopObject';
import { Post } from '../models/threads/post.model';
import { Observable } from 'rxjs';
import { read } from 'fs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root'
})
export class CoopsService {


	constructor(private http: HttpClient, private apiService: ApiService, private sanitizer: DomSanitizer) { }

	createCoop(coopObject: CoopObject) {
		return this.apiService.request(
			'api/private/coop',
			'post',
			null,
			coopObject
		);
	}

	createComment(coopObject: CoopObject, idParent: string) {
		return this.apiService.request(
			'api/private/comment/' + idParent,
			'post',
			null,
			coopObject
		);
	}


}
