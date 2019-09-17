import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SatelliteData} from '../../../services/models/satellite-data/satellite-data.model';
import {ModalController, ToastController} from '@ionic/angular';
import {StorageService} from '../../../services/authentication/storage.service';
import {Thread} from "../../../services/models/threads/thread.model";
import {ThreadsService} from "../../../services/threads.service";
import { SatelliteDataDisplay } from 'src/app/components/satelliteData/satellite-data-display/satellite-data-display.component';
import { SatelliteDataValues } from 'src/app/services/models/satellite-data/satellite-data-values.model';

@Component({
    selector: 'app-stats-details',
    templateUrl: './stats-details.page.html',
    styleUrls: ['./stats-details.page.scss'],
})
export class StatsDetailsPage implements OnInit {

    showCard = false;

    @Input() data: SatelliteData;
    postTitle: string;
    postBody: string;

    @ViewChild("SatelliteDataDisplay")
    dataDisplay: SatelliteDataDisplay;


    constructor(private modalController: ModalController, private usersService: StorageService,
                private toastController: ToastController, private threadsService: ThreadsService) {
    }

    ngOnInit()
    {
        this.dataDisplay.displayChart(this.data);
    }

    async dismissModal() {
        await this.modalController.dismiss();
    }

    async createPost() {
        if (!this.showCard) {
            this.showCard = true;
        } else {
            if (!this.usersService.isAuthenticated()) {
                this.modalController.dismiss({err: 'You need to be logged in to submit a post.'});
            } else {
                const isPostEmpty = this.isPostEmpty();
                if (isPostEmpty) {
                    const toast = await this.toastController.create({
                        message: isPostEmpty,
                        color: 'dark',
                        showCloseButton: true,
                        duration: 3000
                    });
                    toast.present();
                } else {
                    this.submitThread();
                }
            }

        }
    }

    private isPostEmpty(): string {
        if (!this.postTitle || this.postTitle.trim().length === 0) {
            if (!this.postBody || this.postBody.trim().length === 0) {
                return 'Cannot submit an empty post.';
            } else {
                return 'Post title must not be empty.';
            }
        } else {
            if (!this.postBody || this.postBody.trim().length === 0) {
                return 'Post body must not be empty.';
            }
        }
        return null;
    }

    showInfo() {
    }

    private submitThread() {
        //const thread = new Thread('0', this.postTitle, this.stats.category, this.postBody);
        // TODO
        // this.threadsService.submitThread(thread);
        this.modalController.dismiss({success: 'Thread successfully created!'});
    }
}
