import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SatelliteData} from '../../../services/models/satellite-data/satellite-data.model';
import {ModalController, ToastController} from '@ionic/angular';
import {StorageService} from '../../../services/authentication/storage.service';
import { SatelliteService } from 'src/app/services/satellite.service';
import { Category } from 'src/app/services/models/category.model';
import { DatePicker } from '@ionic-native/date-picker/ngx';

@Component({
    selector: 'app-stats-details',
    templateUrl: './stats-details.page.html',
    styleUrls: ['./stats-details.page.scss'],
})
export class StatsDetailsPage implements OnInit {

    showCard = false;

    @Input() data: SatelliteData;
    
    startDate: Date;
    endDate: Date;
    startDateText: string;
    endDateText: string;

    limitStartDate: Date;
    limitEndDate: Date;
    
    
    postTitle: string;
    postBody: string;

    constructor(
            private modalController: ModalController, 
            private usersService: StorageService,
            private toastController: ToastController, 
            private satelliteService: SatelliteService,
            private datePicker: DatePicker)
    {

    }

    ngOnInit()
    {
        this.startDate = new Date();
        this.endDate = new Date();

        var cat : Category = this.data.values[0].dataCategory.threadCategory;
        this.satelliteService.getAvailableDates(cat, res =>{

            this.limitStartDate = new Date(res.start);
            this.limitEndDate = new Date(res.end);
            this.checkCorrectStartDate();
            this.checkCorrectEndDate();
        });
    }

    async dismissModal() {
        await this.modalController.dismiss();
    }






    private checkCorrectStartDate() : void
    {
        if (this.startDate.getTime() < this.limitStartDate.getTime())
            this.startDate = new Date(this.limitStartDate);
        
        this.startDateText = this.startDate.toDateString();
    }

    private checkCorrectEndDate() : void
    {
        if (this.endDate.getTime() > this.limitEndDate.getTime())
            this.endDate = new Date(this.limitEndDate);

        if (this.endDate.getTime() < this.limitStartDate.getTime())
            this.endDate = new Date(this.limitStartDate);
        

        var dd = "" + this.endDate.getDay();
        var mm = "" + this.endDate.getMonth() + 1; //January is 0!

        var yyyy = this.endDate.getFullYear();
        if (this.endDate.getDay() < 10) {
            dd = '0' + dd;
        } 
        if (this.endDate.getMonth() + 1 < 10) {
            mm = '0' + mm;
        } 
        
        this.endDateText = dd + '/' + mm + '/' + yyyy;
    }


    onStartDateChange()
    {
        Date.parse
    }



    updateStartDate()
    {
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
          }).then(
            date => console.log('Got date: ', date),
            err => console.log('Error occurred while getting date: ', err)
          );
    }

    updateEndDate()
    {

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
