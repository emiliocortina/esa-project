import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { GeolocationSearchModal } from './geolocation-search-modal.component';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [GeolocationSearchModal],
    entryComponents: [GeolocationSearchModal],
    exports: [GeolocationSearchModal]
})
export class GeolocationSearchModalModule {
}
