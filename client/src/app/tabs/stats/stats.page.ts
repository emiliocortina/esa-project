import {Component, OnInit} from '@angular/core';
import {SatelliteService} from '../../services/satellite.service';
import {SatelliteStats} from '../../services/models/satellite-data/satellite-stats.model';
import {ModalController, ToastController, LoadingController} from '@ionic/angular';
import {StatsDetailsPage} from './stats-details/stats-details.page';
import {Router} from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
    GoogleMaps,
    GoogleMap,
    Geocoder,
    BaseArrayClass,
    GeocoderResult,
    Marker,
    Environment,
    MyLocation
  } from '@ionic-native/google-maps';


@Component({
    selector: 'app-tab2',
    templateUrl: 'stats.page.html',
    styleUrls: ['stats.page.scss']
})
export class StatsPage implements OnInit {

    stats: SatelliteStats[];

    // TODO geocoding API
    // Google geocoding API (turning search text into coordinate)
    // has a pricing which we won't pay right now.
    // Thus, we're not supporting location search with text.
    
    map: GoogleMap; // We can use map.getPosition() to get latitude and longitude changes
    loading: any;
        
    locationName: string;
    locationLatitude: number;
    locationLongitude: number;


    constructor(private satelliteService: SatelliteService, private modalController: ModalController,
                private toastController: ToastController, private router: Router,
                private geolocation: Geolocation,
                public loadingCtrl: LoadingController) {
    }

    

    ngOnInit(): void {
        this.stats = [];
        this.satelliteService.fetchSatelliteData(this.stats);


        // Get current position using https://ionicframework.com/docs/native/geolocation

        this.geolocation.getCurrentPosition().then((resp) => {
            this.updateGeolocation(resp.coords.latitude, resp.coords.longitude);
        }).catch((error) => {
            console.log('Error getting location', error);
        });

        // Build map

        // This code is necessary for browser
        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyB8xs_5v7l_kQvttOZrSxbDDBiCOMjBhxs',
            'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyB8xs_5v7l_kQvttOZrSxbDDBiCOMjBhxs'
        });
        this.map = GoogleMaps.create('mapCanvas');
    }


    private async updateGeolocation(latitude: number, longitude: number)
    {
        this.locationName = "Oviedo, Asturias, Spain";
        this.locationLatitude = latitude;
        this.locationLongitude = longitude;

        this.loading = await this.loadingCtrl.create({
            message: 'Please wait...'
        });
        await this.loading.present();

        // Get the location of you
        this.map.getMyLocation().then((location: MyLocation) => {
            this.loading.dismiss();
            console.log(JSON.stringify(location, null ,2));
    
            // Move the map camera to the location with animation
            this.map.animateCamera({
                target: location.latLng,
                zoom: 17,
                tilt: 30
            });
    
            // add a marker
            let marker: Marker = this.map.addMarkerSync({
                title: 'My location',
                //snippet: 'This plugin is awesome!',
                position: location.latLng,
                //animation: GoogleMapsAnimation.BOUNCE
            });
    
            // show the infoWindow
            marker.showInfoWindow();
        })
        .catch(err => {
            this.loading.dismiss();
            console.error(err);
        });
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
