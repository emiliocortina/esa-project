import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadsService } from '../../../services/threads/threads.service';
import { Thread } from '../../../services/models/threads/thread.model';
import { CoopsService } from 'src/app/services/threads/coops.service';
import { CoopObject } from 'src/app/services/threads/CoopObject';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/authentication/storage.service';
import { Router } from '@angular/router';
import { Post } from 'src/app/services/models/threads/post.model';

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
    comments: Post[];

    constructor(private route: ActivatedRoute,
        private threadService: ThreadsService,
        private coopsService: CoopsService,
        private toastController: ToastController,
        private usersService: StorageService,
        private router: Router) {
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
        });
    }

    async sendComment() {
        if (!this.usersService.isAuthenticated()) {
            this.generateToast("You need to be logged in to write a comment");
            this.router.navigate(['/profile/login']);
        } else {
            if (!this.commentText || this.commentText.trim().length === 0) {
                this.generateToast("You cannot write an empty comment");
            } else {
                let coopBody = { text: this.commentText };
                await this.coopsService.createComment(new CoopObject(coopBody), this.thread.initialPost.id).subscribe(() => {
                    this.generateToast("Your comment has been published");
                    this.commentText = "";
                    this.setThreadId(this.threadId);
                });
            }
        }
    }

    async generateToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            color: 'dark',
            showCloseButton: true,
            duration: 3000
        });
        toast.present();
    }
}
