import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/authentication/storage.service';
import {User} from '../../services/authentication/user';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab3',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

    user: User;

    constructor(private usersService: StorageService, private router: Router) {
    }

    ngOnInit(): void {
        this.user = this.usersService.getCurrentUser();
        if (!this.user) {
            console.log('no hay user');
        }
    }

    logOut() {
        this.usersService.removeCurrentSession();
    }

}
