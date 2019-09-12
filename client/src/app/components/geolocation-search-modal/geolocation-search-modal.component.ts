import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { StatsPage } from 'src/app/tabs/stats/stats.page';

@Component({
  selector: 'app-geolocation-search-modal',
  templateUrl: './geolocation-search-modal.component.html',
  styleUrls: ['./geolocation-search-modal.component.scss'],
})
export class GeolocationSearchModal implements OnInit
{
  searchText: string;
  results: NativeGeocoderResult[]; 

  statsPage: StatsPage;

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

  async selectLocation(location: NativeGeocoderResult)
  {
    console.log("New location!");
    this.statsPage.setSelectedLocation(location);
    await this.modalController.dismiss();
  }

  findLocation()
  {
    console.log("Looking for: " + this.searchText);

    // https://github.com/sebastianbaar/cordova-plugin-nativegeocoder

    this.nativeGeocoder.forwardGeocode(this.searchText/*, { useLocale: true, maxResults: 3 }*/)
      .then((result: NativeGeocoderResult[]) => {
        
        console.log("Number of results found: " + result.length);
        if (result.length > 0)
          console.log("Most relevant result: " + JSON.stringify(result[0]));

        while(this.results.length > 0)
          this.results.pop();

        for (var i = result.length-1; i >= 0; i --)
          this.results.push(result[i]);
      })
      .catch((error: any) => {
        console.log(error);

        while(this.results.length > 0)
          this.results.pop();
      });
    }

}
