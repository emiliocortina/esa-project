import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TopicsPage} from './topics.page';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: TopicsPage}])
    ],
    providers: [
        HttpClientModule],
    declarations: [TopicsPage]
})
export class TopicsPageModule {
}
