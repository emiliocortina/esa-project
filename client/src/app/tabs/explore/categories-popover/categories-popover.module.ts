import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { CategoriesPopover } from './categories-popover.component';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [CategoriesPopover],
    entryComponents: [CategoriesPopover],
    exports: [CategoriesPopover]
})
export class CategoriesPopoverModule {
}
