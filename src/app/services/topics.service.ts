import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Topic} from './models/topic.model';
import { CategoriesService } from './categories.service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TopicsService {


    constructor(private http: HttpClient, private categoriesService: CategoriesService)
    {
    }

    public loadPopularTopics(list: Topic[], page: number, callback) : void
    {
        for (let i = 0; i < 4; i ++) {
            this.addAsyncDummy(list, "We're doomed", "tides", "We're gonna die");
            this.addAsyncDummy(list, "We're cooked", "temperatures", "It's hot");
        }

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
            );
    }

    private processTopics(topics: Topic[], res: any)
    {
        for (const topic of res.topics) {
            topics.push(new Topic(topic.title, topic.category.name, topic.teaser.content));
        }
    }


    private async addAsyncDummy(list: Topic[], name: string, catId: string, teaser: string)
    {
        await this.timeout(1000);
        this.addDummy(list, name, catId, teaser);
        console.log("ASYNC");
    }

    private timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // TODO remove this
    private addDummy(list: Topic[], name: string, catId: string, teaser: string) : void
    {
        list.push(new Topic(name, this.categoriesService.getCategory(catId), teaser));
    }
}
