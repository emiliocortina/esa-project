import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { SatelliteDataDisplay } from './satellite-data-display.component';
import { ChartModule } from '../chart-component/chart.module';
import { PlainValuesModule } from '../plain-values-component/plain-values.module';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ChartModule,
        PlainValuesModule
    ],
    declarations: [SatelliteDataDisplay],
    entryComponents: [SatelliteDataDisplay],
    exports: [SatelliteDataDisplay]
})
export class SatelliteDataDisplayModule {
}
