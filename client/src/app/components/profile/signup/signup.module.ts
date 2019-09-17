import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SignupPage} from './signup.page';
import {HttpClientModule} from '@angular/common/http';
import { SettingsModalModule } from 'src/app/components/settings-modal/settings-modal.module';
import { ChartModule } from 'src/app/components/chart-component/chart.module';
import { AvatarPopoverModule } from './avatar-popover/avatar-popover.module';

@NgModule({
    imports: [
        SettingsModalModule,
        AvatarPopoverModule,
        ChartModule,
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: SignupPage}])
    ],
    providers: [
        HttpClientModule],
    declarations: [SignupPage]
})
export class SignupPageModule {
}
