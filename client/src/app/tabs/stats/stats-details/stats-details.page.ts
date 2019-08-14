import {Component, Input, OnInit} from '@angular/core';
import {SatelliteStats} from '../../../services/models/satellite-data/satellite-stats.model';
import {ModalController, ToastController} from '@ionic/angular';
import {StorageService} from '../../../services/authentication/storage.service';
import {Topic} from "../../../services/models/topics/topic.model";
import {TopicsService} from "../../../services/topics.service";

@Component({
    selector: 'app-stats-details',
    templateUrl: './stats-details.page.html',
    styleUrls: ['./stats-details.page.scss'],
})
export class StatsDetailsPage implements OnInit {

    showCard = false;

    @Input() stats: SatelliteStats;
    postTitle: string;
    postBody: string;

    constructor(private modalController: ModalController, private usersService: StorageService,
                private toastController: ToastController, private topicService: TopicsService) {
    }

    ngOnInit() {
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
                    this.submitTopic();
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

    private submitTopic() {
        const topic = new Topic('0', this.postTitle, this.stats.category, this.postBody);
        // TODO
        // this.topicService.submitTopic(topic);
        this.modalController.dismiss({success: 'Topic successfully created!'});
    }
}
