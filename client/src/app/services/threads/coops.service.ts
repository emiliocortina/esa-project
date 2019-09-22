import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { CoopObject } from './CoopObject';
import { Post } from '../models/threads/post.model';

@Injectable({
    providedIn: 'root'
})
export class CoopsService {

    constructor(private http: HttpClient, private apiService: ApiService) {
    }

    createCoop(coopObject: CoopObject) {
        return this.apiService
            .request('api/private/coop', 'post', null, coopObject);
    }

    createComment(coopObject: CoopObject, idParent: string) {
        return this.apiService
            .request('api/private/comment/' + idParent, 'post', null, coopObject);
    }


    /*
    public async loadCoop(coopId: string, callback) {
		const params = { page_elements: elements, page_number: page + 1, sort_by: 'timestamp(DES)', filter_by: filter };
		this.apiService.request('api/threadsByDate', 'get', params, null).subscribe(async (threads: any[]) => {
			let remaining = threads.length;
			let temp: Thread[] = [];
			for (let i = 0; i < threads.length; i++) {
				let t = threads[i];
				this.apiService.request('auth/user/' + t.author, 'get', null, null).subscribe(
					(user: any) => {
						let u = new User(user.nickName, user.name, user.email);
						this.apiService.request('api/coop/' + t.head, 'get', null, null).subscribe((coop: any) => {
							let post = new Post(coop._id, coop.text, u, coop.timestamp);
							let thread = new Thread(t._id, t.title, this.categoriesService.getCategory(t.category), post, u);
							temp[i] = thread;
							remaining--;
							if (remaining == 0) {
								temp.forEach(t => {
									list.push(t);
								});
								callback(threads.length);
							}
						});
					}
				);
			}
		});
    }
    */
}
