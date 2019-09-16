import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ChartComponent } from './chart.component';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
    ],
    declarations: [ChartComponent],
    entryComponents: [ChartComponent],
    exports: [ChartComponent]
})
export class ChartModule {
}
