import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Topic} from './models/topic.model';

@Injectable({
    providedIn: 'root'
})
export class TopicsService {

    constructor(private http: HttpClient) {
    }

    public loadPopularTopics(topics: Topic[]) {
        this.http.get('http://192.168.0.11:4567/api/popular')
            .subscribe((res) => this.processTopics(topics, res), (err) => console.log(err));
    }

    private processTopics(topics: Topic[], res: any) {
        for (const topic of res.topics) {
            topics.push(new Topic(topic.title, topic.category.name, topic.teaser.content));
        }
    }
}
