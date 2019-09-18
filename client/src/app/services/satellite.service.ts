import {Injectable} from '@angular/core';
import {SatelliteData} from './models/satellite-data/satellite-data.model';
import { DataCategory } from './models/satellite-data/data-category.model';
import { SatelliteDataValues } from './models/satellite-data/satellite-data-values.model';
import { Category } from './models/category.model';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SatelliteService {

    constructor(private apiService: ApiService)
    {
    }




    

    public async fetchSatelliteData(latitude: number, longitude: number, 
            start: Date, end: Date, category: Category) : Promise<SatelliteData>
    {
        // TODO RIGHT NOW RETURN RANDOM VALUES - We've gotta do a single call to our API
        //var res = await this.simulateAPICall(latitude, longitude, start, end, category);

        var params = new HttpParams()
            .set("latitude", "" + latitude)
            .set("longitude", "" + longitude);

        var promise = this.apiService.request("api/satellite/layer/ozone", "get", params).toPromise();
        var res = await promise;

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

            // TODO !!!!!! SQUARE REGRESSION!!!!!
            var func = (x) => { return Math.random() * Math.pow(x, 2) + Math.random() * x + Math.random() };
            var values = new SatelliteDataValues(start, end, func, cat, res[i].dataPack);
            valuesArray.push(values);
        }
        
        var data = new SatelliteData(category.name, latitude, longitude, start, end, valuesArray);
        return data;
    }



/*
    // TODO remove this once we've got the API ready
    private async simulateAPICall(latitude: number, longitude: number, 
            start: Date, end: Date, category: Category) : Promise<any[]>
    {
        var categories : DataCategory[] = [];
        var result = [];

        var len = 1 + Math.round(Math.random() * 3);
        for (var i = 0; i < len; i ++)
        {
            var keyValuePairs = [];
            for (var j = 0; j < 10; j ++)
            {
                keyValuePairs.push([j, Math.random()]);
            }

            result.push({
                unit: "Dummy cat " + i,
                keyValuePairs: keyValuePairs
            });
        }

        return result;
    }
*/
}
