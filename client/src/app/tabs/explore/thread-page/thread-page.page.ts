import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadsService } from '../../../services/threads/threads.service';
import { Thread } from '../../../services/models/threads/thread.model';
import { CoopsService } from 'src/app/services/threads/coops.service';
import { CoopObject } from 'src/app/services/threads/CoopObject';

@Component({
    selector: 'app-post-page',
    templateUrl: './thread-page.page.html',
    styleUrls: ['./thread-page.page.scss'],
})
export class ThreadPage implements OnInit, OnChanges, OnDestroy {


    threadId: string;
    private routerSubscription: any;
    private thread: Thread;
    commentText: string;

    constructor(private route: ActivatedRoute,
        private threadService: ThreadsService,
        private coopsService: CoopsService) {
    }

    ngOnInit() {
        this.routerSubscription = this.route
            .params
            .subscribe(params => {
                this.setThreadId(params.id);
            });
    }

    ngOnChanges() {
    }

    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }


    setThreadId(id: string) {
        this.threadId = id;

        const callback = res => {
            this.thread = res;
        };

        this.threadService.getThread(id, callback, () => {
            // TODO log or whatever
        });
    }

    sendComment() {
        let coopBody = { text: this.commentText };
        this.coopsService.createComment(new CoopObject(coopBody), this.thread.initialPost.id);
    }

}
