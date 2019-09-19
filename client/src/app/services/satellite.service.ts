import {Injectable} from '@angular/core';
import {SatelliteData} from './models/satellite-data/satellite-data.model';
import { DataCategory } from './models/satellite-data/data-category.model';
import { SatelliteDataValues } from './models/satellite-data/satellite-data-values.model';
import { Category } from './models/category.model';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import { DataMarker } from './models/satellite-data/data-marker.model';

@Injectable({
    providedIn: 'root'
})
export class SatelliteService {

    constructor(private apiService: ApiService)
    {
    }



    /**
     * 
     * @param category 
     * @param callback Callback to an object with start and end dates.
     */
    public async getAvailableDates(category: Category, callback)
    {
        // TODO get all subcategories

        // TODO call to api/satellite/"category", instead of "ozone"
        this.apiService.request("api/satellite/layer/ozone/dates", "get")
            .subscribe(res => callback(res));
    }
    





    public async fetchSatelliteData(latitude: number, longitude: number, 
            start: Date, end: Date, category: Category) : Promise<SatelliteData>
    {
        var params = new HttpParams()
            .set("latitude", "" + latitude)
            .set("longitude", "" + longitude)
            .set("start", start.toISOString())
            .set("end", end.toISOString());
        
        // TODO call to api/satellite/"category", instead of "ozone"
        try {
            var promise = this.apiService.request("api/satellite/" + category.apiRoute, "get", params).toPromise();
            var res = await promise;
        }
        catch (err)
        {
            return undefined;
        }

        // TODO error handling

        return this.processSatelliteData(res, latitude, longitude, start, end, category);
        /*  EVERY RES OBJECT FOLLOWS THIS STRUCTURE:

            var resObj = {
                unit, //which will be transformed into DataCategory
                
                // Collection of key-value pairs
                [
                    [x0, y0],
                    [x1, y1],
                    ...
                    [xn, yn]
                ]
            }
        */

        
    }

    private processSatelliteData(res, latitude: number, longitude: number, 
            start: Date, end: Date, category: Category)
    {
        var valuesArray : SatelliteDataValues[] = [];

        for (var i = 0; i < res.length; i ++)
        {
            var cat = new DataCategory(res[i].unit, category);

            // TODO get the markers from the server
            var markers: DataMarker[] = [];
            markers.push(new DataMarker("Law was approved", new Date("2006-07-12"), ""));

            // TODO !!!!!! SQUARE REGRESSION!!!!!
            var func = (x) => { return Math.random() * Math.pow(x, 2) + Math.random() * x + Math.random() };
            var values = new SatelliteDataValues(start, end, func, cat, markers, res[i].dataPack);
            valuesArray.push(values);
        }
        
        var data = new SatelliteData(category.name, latitude, longitude, start, end, valuesArray);
        return data;
    }


    
}
