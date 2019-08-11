import {Component, OnInit, OnChanges, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TopicsService} from '../../../services/topics.service';
import {Topic} from '../../../services/models/topics/topic.model';

@Component({
    selector: 'app-post-page',
    templateUrl: './topic-page.page.html',
    styleUrls: ['./topic-page.page.scss'],
})
export class TopicPagePage implements OnInit, OnChanges, OnDestroy {


    postId: string;
    private routerSubscription: any;
    private topic: Topic;

    constructor(private route: ActivatedRoute, private topicsService: TopicsService) {
    }

    ngOnInit() {
        this.routerSubscription = this.route
            .params
            .subscribe(params => {
                this.setPostId(params.id);
            });
    }

    ngOnChanges() {
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }


    setPostId(id: string) {
        this.postId = id;

        const callback = res => {
            this.topic = res;
        };

        this.topicsService.getTopic(id, callback, () => {
        });
    }

}
