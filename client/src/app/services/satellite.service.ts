import {Injectable} from '@angular/core';
import {SatelliteData} from './models/satellite-data/satellite-data.model';
import {CategoriesService} from './categories.service';
import {DataField} from './models/satellite-data/data-field.model';

@Injectable({
    providedIn: 'root'
})
export class SatelliteService {

    constructor(private categoriesService: CategoriesService) {
    }


    public fetchSatelliteData(data: SatelliteData[]): void {
        this.fetchPollution(data);
        this.fetchRainfall(data);
        this.fetchTides(data);
        this.fetchTemperatures(data);
    }

    private fetchTemperatures(data: SatelliteData[]) {
        data.push(new SatelliteData('Temperatures',
            this.categoriesService.getCategory('temperatures'),
            new DataField('Current', 20, 'ºC', 'success')));
    }

    private fetchTides(data: SatelliteData[]) {
        data.push(new SatelliteData('Tides',
            this.categoriesService.getCategory('tides'),
            new DataField('Height', 4, 'm', 'warning')));
    }

    private fetchRainfall(data: SatelliteData[]) {
        data.push(new SatelliteData('Rain',
            this.categoriesService.getCategory('rain'),
            new DataField('Volume', 5, 'l/m2', 'success')));
    }

    private fetchPollution(data: SatelliteData[]) {
        data.push(new SatelliteData('Rain',
            this.categoriesService.getCategory('rain'),
            new DataField('Amount', 334, 'ppm', 'danger')));
    }
}
