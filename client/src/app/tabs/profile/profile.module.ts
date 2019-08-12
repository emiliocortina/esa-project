import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProfilePage} from './profile.page';
import {LoginPage} from './login/login.page';
import {NeedAuthGuard} from '../../auth.guard';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: '', component: ProfilePage, canActivate: [NeedAuthGuard]},
            {path: 'login', component: LoginPage}])
    ],
    providers: [
        NeedAuthGuard
    ],
    declarations: [ProfilePage, LoginPage]
})
export class ProfilePageModule {
}
