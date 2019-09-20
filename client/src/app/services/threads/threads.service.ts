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

	/*
        dummies: Thread[] = [new Thread('0',
            'Europe Suffers Heat Wave of Dangerous, Record-High Temperatures',
            this.categoriesService.getCategory('temperatures'),
            'Belgium and the Netherlands set national records, and the all-time marks for Germany and Britain\n' +
            '                    could fall on Thursday. Paris will approach 108 degrees.'),
        new Thread('1',
            'How to Survive a Tsunami',
            this.categoriesService.getCategory('tides'),
            'Get a mile inland or 100 feet above sea level. If in the water, grab something that floats. Don’t give up.'),
        new Thread('2',
            'As Cities Limit Traffic Pollution, Madrid Reverses a Driving Ban',
            this.categoriesService.getCategory('pollution'),
            'Local governments across Europe have spent more than a decade ' +
            'introducing laws that restrict vehicle access to the central areas of many' +
            ' cities in an effort to improve air quality for residents and visitors alike.\n' +
            'But as of Monday, Madrid is heading in the opposite direction.'),
        new Thread('3',
            'Is N.Y.C. Ready for the Next Sandy?',
            this.categoriesService.getCategory('rain'),
            'Days after a heat wave revealed the frailty of the city\'s power grid, thunderstorms ' +
            'overwhelmed parts of the drainage system.'),
        ];
    */

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
        comentarios.forEach((c) => {
            this.apiService.request('api/coop/' + c, 'get', null, null).subscribe((comment: any) => {
                this.apiService.request('auth/user/' + comment.author, 'get', null, null).subscribe((childUser: any) => {
                    let user = new User(childUser.nickName, childUser.name, childUser.email);
                    coop.addComment(new Post(comment._id, comment.text, user, new Date(comment.timestamp)));
                });
            });
        });
    }


    public async loadPopularThreads(list: Thread[], elements: number, page: number, callback) {
        const params = { page_elements: elements, page_number: page + 1, sort_by: 'timestamp(DES)' };
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
                            }
                        });
                    }
                );
            }
        });
    }

    public loadThreadsByUser(list: Thread[], userEmail: string) {
        // TODO paginar esta llamada
        const params = { email: userEmail };
        this.apiService.request('api/threadsByAuthorEmail', 'get', params, null).subscribe((threads: any[]) => {
            threads.forEach((t) => {
                this.apiService.request('api/coop/' + t.head, 'get', null, null).subscribe((coop: any) => {
                    this.apiService.request('auth/user/' + t.author, 'get', null, null).subscribe((user: any) => {
                        let u = new User(user.nickName, user.name, user.email);
                        let post = new Post(coop._id, coop.text, u, coop.timestamp);
                        let obj = new Thread(t._id, t.title, this.categoriesService.getCategory(t.category), post, u);
                        list.push(obj);
                    });
                });
            });
        });
    }

	/*
    private processTopics(topics: Topic[], res: any) {
        for (const topic of res.topics) {
            topics.push(new Topic(topic.title, topic.category.name, topic.teaser.content));
        }
    }*/

    // TODO Remove dummies
    private async addAsyncDummy(list: Thread[], topic: Thread) {
        await this.timeout(1000);
        list.push(topic);
    }

    private timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    createThread(threadObject: ThreadObject) {
        return this.apiService
            .request('api/private/thread', 'post', null, threadObject).subscribe();
    }
}
