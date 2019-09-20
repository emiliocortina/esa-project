import { Injectable } from '@angular/core';
import { Thread } from '../models/threads/thread.model';
import { CategoriesService } from '../categories.service';
import { ThreadObject } from './ThreadObject';
import { ApiService } from '../api.service';
import { Post } from '../models/threads/post.model';
import { StorageService } from '../authentication/storage.service';
import { User } from '../models/users/user';

@Injectable({
    providedIn: 'root'
})
export class ThreadsService {
    constructor(private categoriesService: CategoriesService,
        private apiService: ApiService,
        private userService: StorageService) { }


    public getThread(id: string, res, err): void {
        this.apiService.request('api/thread/' + id, 'get', null, null).subscribe((t: any) => {
            this.apiService.request('auth/user/' + t.author, 'get', null, null).subscribe(async (user: any) => {
                let coop = t.head;
                let u = new User(user.nickName, user.name, user.email);
                let post = new Post(coop._id, coop.text, u, new Date(coop.timestamp));

                let comentarios: any[] = coop.children;
                await this.populateCoop(comentarios, post);

                let obj = new Thread(t._id, t.title, this.categoriesService.getCategory(t.category),
                    post, u);
                res(obj);
            });
        });
    }

    private populateCoop(comentarios: any[], coop: Post) {
        let temp: Post[] = [];
        let remaining = comentarios.length;
        for (let i = 0; i < comentarios.length; i++) {
            let c = comentarios[i];
            this.apiService.request("api/coop/" + c, "get", null, null).subscribe((comment: any) => {
                this.apiService.request("auth/user/" + comment.author, "get", null, null).subscribe((childUser: any) => {
                    let user = new User(childUser.nickName, childUser.name, childUser.email);
                    temp[i] = new Post(comment._id, comment.text, user, new Date(comment.timestamp));
                    remaining--;
                    if (remaining == 0) {
                        coop.addComments(temp);
                    }
                });
            });
        }
    }

    public async loadThreads(filter, list: Thread[], elements: number, page: number, callback) {
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

    public loadThreadsByUser(list: Thread[], elements: number, page: number, userEmail: string, callback) {
        const params = { page_elements: elements, page_number: page + 1, sort_by: 'timestamp(DES)', email: userEmail };
        this.apiService.request('api/threadsByAuthorEmail', 'get', params, null).subscribe((threads: any[]) => {
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

    createThread(threadObject: ThreadObject) {
        return this.apiService
            .request('api/private/thread', 'post', null, threadObject).subscribe();
    }
}
