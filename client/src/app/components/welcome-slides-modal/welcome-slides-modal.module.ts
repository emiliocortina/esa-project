import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { WelcomeSlides } from './welcome-slides-modal.component';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [WelcomeSlides],
    entryComponents: [WelcomeSlides],
    exports: [WelcomeSlides]
})
export class WelcomeSlidesModule {
}
