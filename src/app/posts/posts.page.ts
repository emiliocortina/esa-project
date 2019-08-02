import {Component, OnInit} from '@angular/core';
import {TopicsService} from '../services/topics.service';
import {Topic} from '../services/models/topic.model';

@Component({
    selector: 'app-tab1',
    templateUrl: 'posts.page.html',
    styleUrls: ['posts.page.scss']
})
export class PostsPage implements OnInit {

    topics: Topic[];

    constructor(private topicsService: TopicsService) {
    }

    ngOnInit(): void {
        this.topics = [];
        this.topicsService.loadPopularTopics(this.topics);
    }


}
