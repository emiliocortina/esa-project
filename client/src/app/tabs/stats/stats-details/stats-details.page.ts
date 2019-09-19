import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SatelliteData} from '../../../services/models/satellite-data/satellite-data.model';
import {ModalController, ToastController, LoadingController} from '@ionic/angular';
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
            private datePicker: DatePicker,
            public loadingController: LoadingController)
    {

    }

    ngOnInit()
    {
        this.startDate = new Date();
        this.endDate = new Date();

        var cat : Category = this.data.values[0].dataCategory.threadCategory;
        this.satelliteService.getAvailableDates(cat, res =>{

            console.log("Dates fetched:");
            console.log(res);

            this.limitStartDate = new Date(res.start);
            this.limitEndDate = new Date(res.end);
            this.startDate = this.limitStartDate;
            this.endDate = this.limitEndDate;
            this.checkCorrectStartDate();
            this.checkCorrectEndDate();
        });
    }

    async dismissModal() {
        await this.modalController.dismiss();
    }



    /**
     * Updates the data, putting it inside the chosen
     * date range.
     */
    async updateData()
    {
        console.log("Updating data based on date range...");

        const loading = await this.loadingController.create({
            message: 'Updating values...'
        });
        loading.present();

        this.data = await this.satelliteService.fetchSatelliteData(
            this.data.latitude, 
            this.data.longitude, 
            this.startDate,
            this.endDate,
            this.data.values[0].dataCategory.threadCategory
        );

        this.loadingController.dismiss();
    }








    private checkCorrectStartDate() : void
    {
        if (this.startDate.getTime() < this.limitStartDate.getTime())
            this.startDate = new Date(this.limitStartDate);
        
        if (this.startDate.getTime() > this.limitEndDate.getTime())
            this.startDate = new Date(this.limitStartDate);

        this.startDateText = this.formatDate(this.startDate);
    }

    private checkCorrectEndDate() : void
    {
        if (this.endDate.getTime() > this.limitEndDate.getTime())
            this.endDate = new Date(this.limitEndDate);

        if (this.endDate.getTime() < this.limitStartDate.getTime())
            this.endDate = new Date(this.limitEndDate);
        
        this.endDateText = this.formatDate(this.endDate);
    }

    private formatDate(date: Date) : string
    {
        var dd = "" + date.getDate();
        var mm = "" + (date.getMonth() + 1); //January is 0!
        var yyyy = date.getFullYear();

        if (date.getDate() < 10)
            dd = '0' + dd; 
        if (date.getMonth() + 1 < 10)
            mm = '0' + mm; 
        
        return dd + '/' + mm + '/' + yyyy;
    }


    onStartDateChange()
    {
        console.log("On Start Date Change");

        var date : Date = this.getParsedDate(this.startDateText);
        if (date == null)
        {
            console.log("Invalid date");
            return;
        }
        console.log("Parsed date: " + date.toDateString());

        this.startDate = date;
        this.checkCorrectStartDate();
        this.checkCorrectEndDate();
    }

    onEndDateChange()
    {
        console.log("On Start Date Change");

        var date : Date = this.getParsedDate(this.endDateText);
        if (date == null)
        {
            console.log("Invalid date");
            return;
        }
        console.log("Parsed date: " + date.toDateString());

        this.endDate = date;
        this.checkCorrectEndDate();
    }

    private getParsedDate(str: string)
    {
        var split = str.split("/");
        if (split.length != 3)
            return null;

        if (split[0].length != 2)
            return null;
           
        if (split[1].length != 2)
            return null;

        if (split[2].length != 4)
            return null;

        var date = Date.parse(split[2] + "-" + split[1] + "-" + split[0]);

        if (isNaN(date))
            return null;

        return new Date(date);
    }



    pickStartDate()
    {
        console.log("Opening start date picker");

        this.datePicker.show({
            date: this.startDate,
            minDate: this.limitStartDate,
            maxDate: this.limitEndDate,
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
          }).then(
            date => {
                console.log('Got date: ', date);
                this.startDate = date;
                this.checkCorrectStartDate();
                this.checkCorrectEndDate();
            },
            err => console.log('Error occurred while getting date: ', err)
          );
    }

    pickEndDate()
    {
        console.log("Opening end date picker");

        this.datePicker.show({
            date: this.endDate,
            minDate: this.startDate,
            maxDate: this.limitEndDate,
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
          }).then(
            date => {
                console.log('Got date: ', date);
                this.endDate = date;
                this.checkCorrectEndDate();
            },
            err => console.log('Error occurred while getting date: ', err)
          );
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
