import {SatelliteDataValues} from './satellite-data-values.model';

/**
 * Represents a collection of values collected in
 * a range of time.
 * These values can be represented in different ways.
 * 
 * Is kind of the equivalent of the X axis on a plot.
 */
export class SatelliteData
{
    title: string;

    latitude: number;
    longitude: number;
    start: Date;
    end: Date;
    
    values: SatelliteDataValues[];

    constructor(title: string, latitude: number, longitude: number, start: Date, end: Date, values: SatelliteDataValues[]) 
    {
        this.title = title;
        this.longitude = longitude;
        this.latitude = latitude;
        this.start = start;
        this.end = end;
        this.values = values;
    }
}
