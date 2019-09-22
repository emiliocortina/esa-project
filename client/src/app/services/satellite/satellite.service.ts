import { Injectable } from '@angular/core';
import { SatelliteData } from '../models/satellite-data/satellite-data.model';
import { DataCategory } from '../models/satellite-data/data-category.model';
import { SatelliteDataValues } from '../models/satellite-data/satellite-data-values.model';
import { Category } from '../models/category.model';
import { ApiService } from '../api.service';
import { HttpParams } from '@angular/common/http';
import { DataMarker } from '../models/satellite-data/data-marker.model';
import { MarkersService } from '../markers.service';
import {EsaInfoService} from '../esa-info.service';
import { SatelliteDataValuesObject } from './SatelliteDataValuesObject';
import { SatelliteDataObject } from './SatelliteDataObject';
import { Subscription, Observable } from 'rxjs';
import { CategoriesService } from '../categories.service';

@Injectable({
	providedIn: 'root'
})
export class SatelliteService {
    

	constructor(
		private apiService: ApiService, 
		private markersService: MarkersService, 
		private esaService: EsaInfoService,
		private categoriesService: CategoriesService) {
	}


	createSatelliteDataValues(values: SatelliteDataValuesObject) : Observable<any> {
		return this.apiService
			.request('api/private/satelliteDataValue', 'post', null, values);
	}

	createSatelliteData(data: SatelliteDataObject) : Observable<any> {
		return this.apiService
			.request('api/private/satelliteData', 'post', null, data);
	}

	loadSatelliteData(id: string, callback) : void {
		this.apiService
			.request('api/private/satelliteData/' + id, 'get', null, null)
			.subscribe(async (res : any) => {		

				var start = new Date(res.start);
				var end = new Date(res.end);

				// TODO get all data values
				var markers: DataMarker[] = this.markersService.getInRange(start, end);

				var dataValues: SatelliteDataValues[] = [];
				for (var i = 0; i < res.satelliteDataValues.length; i ++)
				{
					var dv = res.satelliteDataValues[i];
					var category = this.categoriesService.getCategory(dv.dataCategory.threadCategory);
					var dataCat = new DataCategory(dv.dataCategory.unit, category, this.esaService);
		
					var values = new SatelliteDataValues(
						start,
						end, 
						dv.leastSquares, 
						dataCat, 
						markers, 
						dv.keyValuePairs);
					dataValues.push(values)
				}


				var result = new SatelliteData(
					category.name, 
					res.latitude, 
					res.longitude, 
					res.start,
					res.end, 
					dataValues);
				callback(result);
			});
    }





	/**
     *
     * @param category
     * @param callback Callback to an object with start and end dates.
     */
	public async getAvailableDates(category: Category, callback, error) {
		this.apiService.request('api/satellite/' + category.apiRoute + '/dates', 'get')
			.subscribe(res => callback(res), err => error(err));
	}

	public async fetchSatelliteData(latitude: number, longitude: number,
		start: Date, end: Date, category: Category): Promise<SatelliteData> {
		console.log('Fetching satellite data');

		var params = new HttpParams()
			.set('latitude', '' + latitude)
			.set('longitude', '' + longitude)
			.set('start', start.toISOString())
			.set('end', end.toISOString());

		// TODO call to api/satellite/"category", instead of "ozone"
		try {
			var promise = this.apiService.request('api/satellite/' + category.apiRoute, 'get', params).toPromise();
			var res = await promise;
		} catch (err) {
			console.error(err.error);
			return undefined;
		}

		return this.processSatelliteData(res, latitude, longitude, start, end, category);
	}



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
	private processSatelliteData(res, latitude: number, longitude: number,
		start: Date, end: Date, category: Category) {
		var valuesArray: SatelliteDataValues[] = [];

		for (let i = 0; i < res.length; i ++) {
			var cat = new DataCategory(res[i].unit, category, this.esaService);
			var markers: DataMarker[] = this.markersService.getInRange(start, end);

			// TODO !!!!!! SQUARE REGRESSION!!!!!
			var func: string = "0";
			var values = new SatelliteDataValues(start, end, func, cat, markers, res[i].dataPack);
			valuesArray.push(values);
		}

		var data = new SatelliteData(category.name, latitude, longitude, start, end, valuesArray);
		return data;
	}



}
