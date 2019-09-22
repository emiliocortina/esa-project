import { Injectable, ɵConsole } from '@angular/core';
import { Thread } from '../models/threads/thread.model';
import { CategoriesService } from '../categories.service';
import { ThreadObject } from './ThreadObject';
import { ApiService } from '../api.service';
import { Post } from '../models/threads/post.model';
import { StorageService } from '../authentication/storage.service';
import { User } from '../models/users/user';
import { CoopsService } from './coops.service';

@Injectable({
	providedIn: 'root'
})
export class ThreadsService {
	constructor(private categoriesService: CategoriesService,
		private apiService: ApiService,
		private userService: StorageService,
		private coopsService: CoopsService) { }


	public getThread(id: string, res, err): void {
		this.apiService.request('api/thread/' + id, 'get', null, null)
			.subscribe((t: any) => {

				try {
					this.loadPopulatedThreadObject(t, thread => {
						res(thread);
						console.log("THREAD LOADED SUCCESSFULLY!");
					});
				}
				catch (error) {
					err(error);
				}
			});
	}


	public async loadThreads(filter, list: Thread[], elements: number, page: number, callback) {
		const params = { page_elements: elements, page_number: page + 1, sort_by: 'timestamp(DES)', filter_by: filter };
		this.apiService.request('api/threadsByDate', 'get', params, null)
			.subscribe(async (threads: any[]) => {
				this.loadThreadObjects(0, threads, list, () => {
					callback(threads.length);
				});
			});
	}



	public loadThreadsByUser(list: Thread[], elements: number, page: number, userEmail: string, callback) {
		const params = { page_elements: elements, page_number: page + 1, sort_by: 'timestamp(DES)', email: userEmail };
		this.apiService.request('api/threadsByAuthorEmail', 'get', params, null)
			.subscribe((threads: any[]) => {
				this.loadThreadObjects(0, threads, list, () => {
					callback(threads.length);
				});
			});
	}




	private loadThreadObjects(count: number, threadObjects, threadArray: Thread[], callback) {
		if (count >= threadObjects.length) {
			callback();
			return;
		}
		this.loadThreadObject(threadObjects[count], thread => {
			threadArray.push(thread);
			this.loadThreadObjects(count + 1, threadObjects, threadArray, callback);
		});
	}

	private loadThreadObject(threadObj, callback) {
		console.log("Loading thread object:");
		console.log(threadObj);
		this.apiService.request('auth/user/' + threadObj.author, 'get', null, null)
			.subscribe((user: any) => {
				let u = new User(user.nickName, user.name, user.email);

				console.log("ME VOY A CAGAR EN TODO LO QUE SE MENEA")
				console.log(threadObj.head);

				this.coopsService.loadCoop(threadObj.head, u, threadObj.category, coop => {

					let thread = new Thread(threadObj._id, threadObj.title,
						this.categoriesService.getCategory(threadObj.category),
						coop, u);

					callback(thread);
				});
			}
			);
	}


	private loadPopulatedThreadObject(threadObj, callback) {
		console.log("Loading thread object:");
		console.log(threadObj);
		this.apiService.request('auth/user/' + threadObj.author, 'get', null, null)
			.subscribe((user: any) => {
				let u = new User(user.nickName, user.name, user.email);

				console.log("ME VOY A CAGAR EN TODO LO QUE SE MENEA")
				console.log(threadObj.head._id);

				this.coopsService.loadCoopFromObject(threadObj.head, u, threadObj.category, coop => {

					let thread = new Thread(threadObj._id, threadObj.title,
						this.categoriesService.getCategory(threadObj.category),
						coop, u);

					callback(thread);
				});
			}
			);
	}





	createThread(threadObject: ThreadObject) {
		return this.apiService
			.request('api/private/thread', 'post', null, threadObject).subscribe();
	}
}
