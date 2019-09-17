import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { AvatarPopover } from './avatar-popover.component';


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    declarations: [AvatarPopover],
    entryComponents: [AvatarPopover],
    exports: [AvatarPopover]
})
export class AvatarPopoverModule {
}
