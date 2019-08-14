import {Component, OnInit} from '@angular/core';
import {SatelliteService} from '../../services/satellite.service';
import {SatelliteStats} from '../../services/models/satellite-data/satellite-stats.model';
import {ModalController, ToastController} from '@ionic/angular';
import {StatsDetailsPage} from './stats-details/stats-details.page';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab2',
    templateUrl: 'stats.page.html',
    styleUrls: ['stats.page.scss']
})
export class StatsPage implements OnInit {

    stats: SatelliteStats[];

    constructor(private satelliteService: SatelliteService, private modalController: ModalController,
                private toastController: ToastController, private router: Router) {
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
        modal.onDidDismiss().then((detail) => {
            if (detail !== null) {
                if (detail.data && detail.data.err) {
                    this.showToast(detail.data.err);
                    this.router.navigate(['/tabs/profile/login']);
                }
            }
        });
        return await modal.present();
    }

    async showToast(msg: string) {
        const toast = await this.toastController.create({
            color: 'dark',
            message: msg,
            showCloseButton: true,
            duration: 3000
        });
        toast.present();
    }
}
