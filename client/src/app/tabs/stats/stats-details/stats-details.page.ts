import {Component, Input, OnInit} from '@angular/core';
import {SatelliteStats} from '../../../services/models/satellite-data/satellite-stats.model';
import {ModalController} from '@ionic/angular';

@Component({
    selector: 'app-stats-details',
    templateUrl: './stats-details.page.html',
    styleUrls: ['./stats-details.page.scss'],
})
export class StatsDetailsPage implements OnInit {

    showCard = false;

    @Input() stats: SatelliteStats;

    constructor(private modalController: ModalController) {
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
            // Submit the post;
        }
    }

    showInfo() {
    }
}
