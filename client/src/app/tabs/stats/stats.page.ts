import {Component, OnInit} from '@angular/core';
import {SatelliteService} from '../../services/satellite.service';
import {SatelliteStats} from '../../services/models/satellite-data/satellite-stats.model';
import {ModalController} from '@ionic/angular';
import {StatsDetailsPage} from "./stats-details/stats-details.page";

@Component({
    selector: 'app-tab2',
    templateUrl: 'stats.page.html',
    styleUrls: ['stats.page.scss']
})
export class StatsPage implements OnInit {

    stats: SatelliteStats[];

    constructor(private satelliteService: SatelliteService, private modalController: ModalController) {
    }

    ngOnInit(): void {
        this.stats = [];
        this.satelliteService.fetchSatelliteData(this.stats);
    }

    async showStatsDetails(selectedStats: SatelliteStats) {
        const modal = await this.modalController.create({
            component: StatsDetailsPage,
            componentProps: {
                stats: selectedStats
            }
        });
        return await modal.present();
    }
}
