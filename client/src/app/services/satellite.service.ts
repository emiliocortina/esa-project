import {Injectable} from '@angular/core';
import {SatelliteData} from './models/satellite-data/satellite-data.model';
import { DataCategory } from './models/satellite-data/data-category.model';
import { SatelliteDataValues } from './models/satellite-data/satellite-data-values.model';

@Injectable({
    providedIn: 'root'
})
export class SatelliteService {

    constructor()
    {
    }


    public async fetchSatelliteData(latitude: number, longitude: number, 
            start: Date, end: Date, category: DataCategory) : Promise<SatelliteData>
    {
        // TODO RIGHT NOW RETURN RANDOM VALUES
        var func = (x) => { return Math.random() * Math.pow(x, 2) + Math.random() * x + Math.random() };
        var values = new SatelliteDataValues(func, category);

        var data = new SatelliteData(latitude, longitude, start, end, values);
        return data;
    }

}
