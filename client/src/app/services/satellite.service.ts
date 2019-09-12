import {Injectable} from '@angular/core';
import {SatelliteStats} from './models/satellite-data/satellite-stats.model';
import {CategoriesService} from './categories.service';
import {StatsField} from './models/satellite-data/stats-field.model';

@Injectable({
    providedIn: 'root'
})
export class SatelliteService {

    constructor(private categoriesService: CategoriesService) {
    }


    public fetchSatelliteData(data: SatelliteStats[], latitude: number, longitude: number): void {
        this.fetchPollution(data);
        this.fetchTemperatures(data);
        this.fetchRainfall(data);
        this.fetchTides(data);
    }

    private fetchTemperatures(data: SatelliteStats[]) {
        data.push(new SatelliteStats('Temperatures',
            this.categoriesService.getCategory('temperatures'),
            new StatsField('Current', 20, 'ºC', 'success')));
    }

    private fetchTides(data: SatelliteStats[]) {
        const tidesStats = new SatelliteStats('Tides',
            this.categoriesService.getCategory('tides'),
            new StatsField('Current Height', 4, 'm', 'warning'));
        tidesStats.addField(new StatsField('Highest', 8, 'm', 'danger'));
        tidesStats.addField(new StatsField('Lowest', 4, 'm', 'warning'));
        data.push(tidesStats);
    }

    private fetchRainfall(data: SatelliteStats[]) {
        data.push(new SatelliteStats('Rain',
            this.categoriesService.getCategory('rain'),
            new StatsField('Volume', 5, 'l/m2', 'success')));
    }

    private fetchPollution(data: SatelliteStats[]) {
        data.push(new SatelliteStats('Pollution',
            this.categoriesService.getCategory('pollution'),
            new StatsField('Amount', 334, 'ppm', 'danger')));
    }
}
