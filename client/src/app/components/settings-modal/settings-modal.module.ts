import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { SettingsModal } from './settings-modal.component';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [SettingsModal],
    entryComponents: [SettingsModal],
    exports: [SettingsModal]
})
export class SettingsModalModule {
}
