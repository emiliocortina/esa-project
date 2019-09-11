import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-geolocation-search-modal',
  templateUrl: './geolocation-search-modal.component.html',
  styleUrls: ['./geolocation-search-modal.component.scss'],
})
export class GeolocationSearchModal implements OnInit
{
  searchText: string;
  results: NativeGeocoderResult[];  

  constructor(
      private modalController: ModalController,
      private nativeGeocoder: NativeGeocoder
    ) 
  { 
    this.results = [];
  }

  ngOnInit() {}


  async close()
  {
    await this.modalController.dismiss();
  }

  findLocation()
  {
    console.log("Looking for: " + this.searchText);

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    

    // https://github.com/sebastianbaar/cordova-plugin-nativegeocoder

    this.nativeGeocoder.forwardGeocode(this.searchText, options)
      .then((result: NativeGeocoderResult[]) => {
        
        while(this.results.length > 0)
          this.results.pop();

        result.forEach(res => this.results.push(res));
      })
      .catch((error: any) => console.log(error));
    }

}
