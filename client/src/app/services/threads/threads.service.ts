import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Thread} from '../models/threads/thread.model';
import {CategoriesService} from '../categories.service';
import { ThreadObject } from './ThreadObject';
import { ApiService } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class ThreadsService {


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


    constructor(private http: HttpClient,
                private categoriesService: CategoriesService,
                private apiService: ApiService) { }


    public getThread(id: string, res, err): void {
        // TODO call the backend
        res(this.dummies[id]);
    }


    public loadPopularThreads(list: Thread[], page: number, callback): void {
        for (let i = 0; i < 3; i++) {
            this.addAsyncDummy(list, this.dummies[i]);
            this.addAsyncDummy(list, this.dummies[i + 1]);
        }

        /*
        this.http.get('http://192.168.0.11:4567/api/popular')
            .subscribe(
                (res) => {
                    this.processTopics(list, res);
                    callback(res);
                },
                (err) => {
                    console.log(err);
                    callback(err);
                }
            );*/
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
