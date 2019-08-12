import {Component, Input, OnInit} from '@angular/core';
import {SatelliteStats} from '../../../services/models/satellite-data/satellite-stats.model';
import {ModalController} from '@ionic/angular';
import {StorageService} from '../../../services/authentication/storage.service';

@Component({
    selector: 'app-stats-details',
    templateUrl: './stats-details.page.html',
    styleUrls: ['./stats-details.page.scss'],
})
export class StatsDetailsPage implements OnInit {

    showCard = false;

    @Input() stats: SatelliteStats;

    constructor(private modalController: ModalController, private usersService: StorageService) {
    }

    ngOnInit() {
    }

    async dismissModal() {
        await this.modalController.dismiss();
    }

    createPost() {
        if (!this.showCard) {
            this.showCard = true;
        } else {
            if (!this.usersService.isAuthenticated()) {
                this.modalController.dismiss({err: 'You need to be logged in to submit a post.'});
            }
        }
    }

    showInfo() {
    }
}
