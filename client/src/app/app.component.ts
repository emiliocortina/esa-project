import {Component} from '@angular/core';

import {Platform, ModalController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import { timer } from 'rxjs';
import { SettingsService } from './services/settings.service';
import { WelcomeSlides } from './components/welcome-slides-modal/welcome-slides-modal.component';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    showSplash = false;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private settings: SettingsService,
        private modalController: ModalController
    ) {
        this.initializeApp();
    }


    private async openWelcomeSlides()
    {
        const modal = await this.modalController.create({
            component: WelcomeSlides
        });
        return await modal.present();
    }


    initializeApp() {
        this.platform.ready().then(() => {

            if(this.platform.is('android'))
            {
                console.log("Cooper running on Android");
                this.initAndroid();
            }
            else if(this.platform.is('ios'))
            {
                console.log("Cooper running on iOS");
                this.initIOS();
            }
            else if(this.platform.is('desktop'))
            {
                console.log("Cooper running on Desktop");
            }
            else
            {
                console.error("Unknown platform.");
            }

            this.splashScreen.hide();
            // TODO check tutorial
            this.openWelcomeSlides();
        });
    }

    private initAndroid() : void
    {
        // https://github.com/apache/cordova-plugin-statusbar 

        //this.statusBar.styleBlackOpaque();
        //this.statusBar.styleLightContent();
        this.statusBar.overlaysWebView(true);
        this.statusBar.backgroundColorByHexString('#06336B');
        this.statusBar.show();
    }
  
    private initIOS() : void
    {
  
    }


}
