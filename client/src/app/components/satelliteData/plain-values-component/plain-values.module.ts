import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PlainValuesComponent } from './plain-values.component';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
    ],
    declarations: [PlainValuesComponent],
    entryComponents: [PlainValuesComponent],
    exports: [PlainValuesComponent]
})
export class PlainValuesModule {
}
