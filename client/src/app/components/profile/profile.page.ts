import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../services/authentication/storage.service';
import { User } from '../../services/models/users/user';
import { Router } from '@angular/router';
import { Thread } from "../../services/models/threads/thread.model";
import { ThreadsService } from "../../services/threads/threads.service";
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
    selector: 'app-tab3',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    user: User;
    createdThreads: Thread[];
    page: number = 0;
    elements = 5;
    returned: number;

    constructor(private usersService: StorageService, private router: Router, private threadService: ThreadsService) {
        this.usersService.onUserChange.push(((user) => this.update(user)));
    }

    ngOnInit(): void {
        this.update(this.usersService.getCurrentUser());
    }

    private update(user: User) {
        this.user = user;
        this.createdThreads = [];
        this.loadThreads();
        //this.threadService.loadThreadsByUser(this.createdThreads, this.elements, this.page, this.user.email);
        if (!this.user) {
            console.log('no hay user');
        }
    }

    loadThreads(infiniteScroll?) {
        this.threadService.loadThreadsByUser(this.createdThreads, this.elements, this.page, this.user.email, (res: number) => {
            this.returned = res;
            if (infiniteScroll) {
                infiniteScroll.target.complete();
            }
        });
    }

    logOut() {
        this.usersService.removeCurrentSession();
        this.router.navigate(['']);
    }

    loadMorePosts(infiniteScroll) {
        setTimeout(() => {
            infiniteScroll.target.complete();

            if (this.returned < this.elements) {
                infiniteScroll.target.disabled = true;
            } else {
                this.page++;
                this.loadThreads(infiniteScroll);
            }
        }, 500);
    }

}
