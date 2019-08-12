import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../services/users.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-tab3',
    templateUrl: 'profile.page.html',
    styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

    constructor(private usersService: UsersService, private router: Router) {
    }

    ngOnInit(): void {
        if (!this.usersService.getUser()) {
            this.router.navigate(['/login']);
        }
    }

}
