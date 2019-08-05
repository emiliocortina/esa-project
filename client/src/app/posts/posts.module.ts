import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PostsPage} from './posts.page';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: PostsPage}])
    ],
    providers: [
        HttpClientModule],
    declarations: [PostsPage]
})
export class PostsPageModule {
}
