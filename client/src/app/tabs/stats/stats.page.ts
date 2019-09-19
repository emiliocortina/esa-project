import {Component, OnInit, ViewChild} from '@angular/core';
import {SatelliteService} from '../../services/satellite.service';
import {SatelliteData} from '../../services/models/satellite-data/satellite-data.model';
import {ModalController, ToastController, LoadingController} from '@ionic/angular';
import {StatsDetailsPage} from './stats-details/stats-details.page';
import {Router} from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationSearchModal } from 'src/app/components/geolocation-search-modal/geolocation-search-modal.component';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { SatelliteDataDisplay } from 'src/app/components/satelliteData/satellite-data-display/satellite-data-display.component';
import { DataCategory } from 'src/app/services/models/satellite-data/data-category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { SatelliteDataValues } from 'src/app/services/models/satellite-data/satellite-data-values.model';
import { Category } from 'src/app/services/models/category.model';


@Component({
    selector: 'stats-page',
    templateUrl: 'stats.page.html',
    styleUrls: ['stats.page.scss']
})
export class StatsPage implements OnInit {
  
    // Some sample data from that location
    collectedData: SatelliteData[];

    isLocationReady: boolean = false;
    anyErrorWithLocation: boolean = false;

    locationName: string;
    locationLatitude: number;
    locationLongitude: number;

    // TODO change start/end date
    startDate: Date;
    endDate: Date;



    constructor(
        private categoriesService: CategoriesService,
        private satelliteService: SatelliteService, 
        private modalController: ModalController,
        private toastController: ToastController,
        private router: Router,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        public loadingController: LoadingController
    ) {

    }

    
    ngOnInit(): void {
        this.collectedData = [];
        this.getCurrentLocation();
    }


    /**
     * Opens the GeolocationSearchModal to manually search
     * a location coordinates.
     */
    async openSearchModal()
    {
        const modal = await this.modalController.create({
            component: GeolocationSearchModal,
            componentProps: { 
                statsPage: this
            }
        });
        return await modal.present();
    }




    /**
     * Used locally. Updates our data once we get the current coordinates,
     * and also looks for the name of the place we're at.
     * @param latitude 
     * @param longitude 
     */
    private async updateGeolocation(latitude: number, longitude: number)
    {
        console.log("Geolocation update");
        this.isLocationReady = true;
        this.anyErrorWithLocation = false;

        this.locationName = "";
        this.locationLatitude = latitude;
        this.locationLongitude = longitude;

        this.updateData();

        // https://github.com/sebastianbaar/cordova-plugin-nativegeocoder

        this.nativeGeocoder.reverseGeocode(latitude, longitude, { useLocale: true, maxResults: 1 })
            .then((result: NativeGeocoderResult[]) => {
                console.log(JSON.stringify(result[0]));
                this.locationName = result[0].locality;
            })            
            .catch((error: any) => {
                console.log(error);
                this.locationName = "Unknown location";
            });
    }



    /**
     * Used by the GeolocationSearchModal.
     * Sets our location tot he coordinates of a given NativeGeocoderResult.
     * @param location 
     */
    setSelectedLocation(location: NativeGeocoderResult)
    {
        console.log("Geolocation set");
        this.isLocationReady = true;
        this.anyErrorWithLocation = false;

        this.locationName = location.locality;
        this.locationLatitude = Number(location.latitude);
        this.locationLongitude = Number(location.longitude);

        this.updateData();
    }

    


    /**
     * Updates the data we're showing, depending on our
     * current stored coordinates.
     */
    private async updateData()
    {
        console.log("Calling updateData");

        const loading = await this.loadingController.create({
            message: 'Getting data near your location...'
        });
        loading.present();

        while (this.collectedData.length > 0)
            this.collectedData.pop();

        var categories = this.categoriesService.getCategories();

        for (var i = 0; i < categories.length; i ++)
        {
            var data = await this.satelliteService.fetchSatelliteData(
                    this.locationLatitude, 
                    this.locationLongitude, 
                    new Date("2006-07-01"), // TODO change!!!!!
                    new Date("2006-07-31"),
                    categories[i]
                );
            if (data)
                this.collectedData.push(data);
        }

        this.loadingController.dismiss();
    }


    /**
     * Uses the native geolocation API to get our current
     * location coordinates.
     * Once we get them, we'll update our data.
     */
    getCurrentLocation()
    {
        // Get current position using https://ionicframework.com/docs/native/geolocation

        this.isLocationReady = false;
        this.anyErrorWithLocation = false;
        console.log('Getting current geolocation...');

        this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: false })
            .then((resp) => {
                this.updateGeolocation(resp.coords.latitude, resp.coords.longitude);
            })
            .catch((error) => {
                console.log('Error getting location', error);
                this.anyErrorWithLocation = true;
            });
    }






    async showSatelliteDataDetails(data: SatelliteData) {
        const modal = await this.modalController.create({
            component: StatsDetailsPage,
            componentProps: {
                data: data
            }
        });
        modal.onDidDismiss().then((detail) => {
            if (detail !== null) {
                if (detail.data) {
                    if (detail.data.err) {
                        this.showToast(detail.data.err, 'dark');
                        this.router.navigate(['/tabs/profile/login']);
                    } else {
                        if (detail.data.success) {
                            this.showToast(detail.data.success, 'success');
                        }
                    }
                }

            }
        });
        return await modal.present();
    }

    async showToast(msg: string, color: string) {
        const toast = await this.toastController.create({
            color: color,
            message: msg,
            showCloseButton: true,
            duration: 3000
        });
        toast.present();
    }
}
