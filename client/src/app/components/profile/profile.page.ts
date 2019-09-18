import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../services/authentication/storage.service';
import {User} from '../../services/models/users/user';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab3',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

    user: User;

    constructor(private usersService: StorageService, private router: Router) {

        this.usersService.onUserChange.push(((user) => this.update(user)));

    }

    ngOnInit(): void {
        this.update(this.usersService.getCurrentUser());
    }

    private update(user: User)
    {
        this.user = user;
        if (!this.user) {
            console.log('no hay user');
        }
    }



    logOut() {
        this.usersService.removeCurrentSession();
        this.router.navigate(['']);
    }

}
