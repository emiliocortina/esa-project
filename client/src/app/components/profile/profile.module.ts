import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfilePage} from './profile.page';
import {LoginPage} from './login/login.page';
import {NeedAuthGuard} from '../../auth.guard';
import {SignupPage} from "./signup/signup.page";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {path: '', component: ProfilePage, canActivate: [NeedAuthGuard]},
            {path: 'login', component: LoginPage},
            {path: 'signup', component: SignupPage}]),
        ReactiveFormsModule
    ],
    providers: [
        NeedAuthGuard
    ],
    declarations: [ProfilePage, LoginPage, SignupPage]
})
export class ProfilePageModule {
}
