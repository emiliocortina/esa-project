import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/authentication/storage.service';
import {User} from '../../services/models/users/user';
import {Router} from '@angular/router';
import {Thread} from "../../services/models/threads/thread.model";
import {ThreadsService} from "../../services/threads/threads.service";

@Component({
    selector: 'app-tab3',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

    user: User;
    createdThreads: Thread[];

    constructor(private usersService: StorageService, private router: Router, private threadService: ThreadsService) {
        this.usersService.onUserChange.push(((user) => this.update(user)));
    }

    ngOnInit(): void {
        this.update(this.usersService.getCurrentUser());
    }

    private update(user: User)
    {
        this.user = user;
        this.createdThreads = [];
        this.threadService.loadThreadsByUser(this.createdThreads, this.user.email);
        if (!this.user) {
            console.log('no hay user');
        }
    }



    logOut() {
        this.usersService.removeCurrentSession();
        this.router.navigate(['']);
    }

}
