import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ExpandableComponent } from './expandable.component';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [ExpandableComponent],
    entryComponents: [ExpandableComponent],
    exports: [ExpandableComponent]
})
export class ExpandableComponentModule {
}
