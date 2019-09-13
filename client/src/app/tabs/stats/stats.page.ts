import {Component, OnInit} from '@angular/core';
import {SatelliteService} from '../../services/satellite.service';
import {SatelliteStats} from '../../services/models/satellite-data/satellite-stats.model';
import {ModalController, ToastController, LoadingController} from '@ionic/angular';
import {StatsDetailsPage} from './stats-details/stats-details.page';
import {Router} from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationSearchModal } from 'src/app/components/geolocation-search-modal/geolocation-search-modal.component';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';


@Component({
    selector: 'stats-page',
    templateUrl: 'stats.page.html',
    styleUrls: ['stats.page.scss']
})
export class StatsPage implements OnInit {
  
    stats: SatelliteStats[];

    // TODO geocoding API
    // Google geocoding API (turning search text into coordinate)
    // has a pricing which we won't pay right now.
    // Thus, we're not supporting location search with text.
    
    loading: any;
        

    isLocationReady: boolean = false;
    locationName: string;
    locationLatitude: number;
    locationLongitude: number;


    constructor(
        private satelliteService: SatelliteService, 
        private modalController: ModalController,
        private toastController: ToastController,
        private router: Router,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder
    ) {

    }

    

    ngOnInit(): void {
        this.stats = [];
                
        // Get current position using https://ionicframework.com/docs/native/geolocation

        this.isLocationReady = false;
        console.log('Getting current geolocation...');

        this.geolocation.getCurrentPosition().then((resp) => {
            this.updateGeolocation(resp.coords.latitude, resp.coords.longitude);
        }).catch((error) => {
            console.log('Error getting location', error);
        });

    }


    async openModal()
    {
        const modal = await this.modalController.create({
            component: GeolocationSearchModal,
            componentProps: { 
                statsPage: this
            }
        });
        return await modal.present();
    }


    private async updateGeolocation(latitude: number, longitude: number)
    {
        console.log("Geolocation update");
        this.isLocationReady = true;

        this.locationName = "";
        this.locationLatitude = latitude;
        this.locationLongitude = longitude;

        this.satelliteService.fetchSatelliteData(this.stats, latitude, longitude);

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
     * Used by the GeolocationSearchModal
     * @param location 
     */
    setSelectedLocation(location: NativeGeocoderResult)
    {
        console.log("Geolocation set");
        this.isLocationReady = true;

        this.locationName = location.locality;
        this.locationLatitude = Number(location.latitude);
        this.locationLongitude = Number(location.longitude);

        this.satelliteService.fetchSatelliteData(this.stats, this.locationLatitude, this.locationLongitude);
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
