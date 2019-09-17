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
    latitude: number;
    longitude: number;
    start: Date;
    end: Date;
    
    primaryValues: SatelliteDataValues;
    secondaryValues: SatelliteDataValues; // Optional

    constructor(latitude: number, longitude: number, start: Date, end: Date, primaryValues: SatelliteDataValues) 
    {
        this.longitude = longitude;
        this.latitude = latitude;
        this.start = start;
        this.end = end;
        this.primaryValues = primaryValues;
    }
}
