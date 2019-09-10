import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {StatsPage} from './stats.page';
import {StatsDetailsPage} from './stats-details/stats-details.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: StatsPage}])
    ],
    providers: [
        Geolocation
    ],
    declarations: [StatsPage, StatsDetailsPage],
    entryComponents: [StatsDetailsPage]
})
export class StatsPageModule {
}
