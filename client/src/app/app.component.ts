import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import { timer } from 'rxjs';
import { SettingsService } from './services/settings.service';

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
        private settings: SettingsService
    ) {
        this.initializeApp();
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
