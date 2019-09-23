import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SatelliteData} from '../../../services/models/satellite-data/satellite-data.model';
import {ModalController, ToastController, LoadingController} from '@ionic/angular';
import {StorageService} from '../../../services/authentication/storage.service';
import { SatelliteService } from 'src/app/services/satellite/satellite.service';
import { Category } from 'src/app/services/models/category.model';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { CreatePostModalPage } from '../../explore/create-post-modal/create-post-modal.page';
import { Router } from '@angular/router';

@Component({
    selector: 'app-stats-details',
    templateUrl: './stats-details.page.html',
    styleUrls: ['./stats-details.page.scss'],
})
export class StatsDetailsPage implements OnInit {

    showCard = false;
    isMissionDetailsExpanded = true;

    @Input() locationName: string;
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
            private userService: StorageService,
            private toastController: ToastController, 
            private satelliteService: SatelliteService,
            private datePicker: DatePicker,
            private router: Router,
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
        },
        async err => {
            console.error(err);
            this.showDangerToast("Could not update the stats for the wished time range.");
        });
    }

    async dismissModal() {
        await this.modalController.dismiss();
    }

    async showDangerToast(msg: string)
    {
        const toast = await this.toastController.create({
            color: 'danger',
            message: msg,
            showCloseButton: true,
            duration: 3000
        });
        toast.present();
    }

    toggleMissionDetailsExpand()
    {
        this.isMissionDetailsExpanded = !this.isMissionDetailsExpanded;
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

        var data = await this.satelliteService.fetchSatelliteData(
            this.data.latitude, 
            this.data.longitude, 
            this.startDate,
            this.endDate,
            this.data.values[0].dataCategory.threadCategory
        );

        if (data) {
            this.data = data;
        }
        else {
            this.showDangerToast("Could not update the stats for the wished time range.");
        }

        this.loadingController.dismiss();
    }








    private async checkCorrectStartDate()
    {
        if (this.startDate.getTime() < this.limitStartDate.getTime())
        {
            this.startDate = new Date(this.limitStartDate);
            this.showDangerToast("The start date is out of range. Minimum date: "
                    + this.limitStartDate.toDateString());
        }
        else if (this.startDate.getTime() > this.limitEndDate.getTime())
        {
            this.startDate = new Date(this.limitStartDate);
            this.showDangerToast("The start date is out of range. Maximum date: "
                    + this.limitEndDate.toDateString());
        }

        this.startDateText = this.formatDate(this.startDate);
    }

    private checkCorrectEndDate() : void
    {
        if (this.endDate.getTime() > this.limitEndDate.getTime())
        {
            this.endDate = new Date(this.limitEndDate);
            this.showDangerToast("The end date must be greater than start date");
        }
        else if (this.endDate.getTime() < this.limitStartDate.getTime())
        {
            this.endDate = new Date(this.limitEndDate);
            this.showDangerToast("The end date is out of range. Maximum date: "
                    + this.limitEndDate.toDateString());
        }

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
            titleText: "Start date",
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
            titleText: "End date",
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





    async createCooper() {
        if (!this.userService.isAuthenticated()) {
            const toast = await this.toastController.create({
                message: 'You need to be logged in to submit a post.',
                color: 'dark',
                showCloseButton: true,
                duration: 3000
            });
            toast.present();
            this.router.navigate(['/profile/login']);
            this.dismissModal();
        } else {
            this.dismissModal();
            let modal = await this.modalController.create({ 
                component: CreatePostModalPage,
                componentProps: { 
                    data: this.data
                }
            });

            modal.onDidDismiss().then(() => {
                //this.loadThreads();
                // TODO?
            });

            return await modal.present();
        }
    }



}
