import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {StatsPage} from './stats.page';
import {StatsDetailsPage} from './stats-details/stats-details.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GeolocationSearchModalModule } from 'src/app/components/geolocation-search-modal/geolocation-search-modal.module';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { SatelliteDataDisplayModule } from 'src/app/components/satelliteData/satellite-data-display/satellite-data-display.module';


@NgModule({
    imports: [
        GeolocationSearchModalModule,
        IonicModule,
        CommonModule,
        FormsModule,
        SatelliteDataDisplayModule,
        RouterModule.forChild([{path: '', component: StatsPage}])
    ],
    providers: [
        Geolocation,
        NativeGeocoder
    ],
    declarations: [StatsPage, StatsDetailsPage],
    entryComponents: [StatsDetailsPage]
})
export class StatsPageModule {
}
