import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ExplorePage} from './explore.page';
import {HttpClientModule} from '@angular/common/http';
import { SettingsModalModule } from 'src/app/components/settings-modal/settings-modal.module';
import { CategoriesPopoverModule } from './categories-popover/categories-popover.module';

@NgModule({
    imports: [
        SettingsModalModule,
        CategoriesPopoverModule,
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: ExplorePage}])
    ],
    providers: [
        HttpClientModule],
    declarations: [ExplorePage]
})
export class ExplorePageModule {
}
