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

	getImage(): Observable<File> {

		const latitude = 41.808521;
		const longitude = 41.808521;
		return this.apiService.getOpticMapImage(latitude, longitude);

	}
	createImageFromBlob(image: Blob, result: any) {
		const reader = new FileReader();
		reader.readAsDataURL(image);
		const sanitizer = this.sanitizer;
		reader.onloadend = function () {
			console.log(reader.result);
			result = sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + reader.result);
		};
	}
}
