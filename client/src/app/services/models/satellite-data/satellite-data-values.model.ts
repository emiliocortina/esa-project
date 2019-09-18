import { DataCategory } from './data-category.model';

/**
 * Represents the Y axis of a plot.
 */
export class SatelliteDataValues
{

    start: Date;
    end: Date;

    func: any; // The function that will evaluate an X value of the plot
    dataCategory: DataCategory;

    // TODO remove this after we achieve quatratic approximation
    keyValuePairs;


    constructor(start: Date, end: Date, func: any, dataCategory: DataCategory, keyValuePairs) {
        this.start = start;
        this.end = end;
        this.func = func;
        this.dataCategory = dataCategory;
        this.keyValuePairs = keyValuePairs; // TODO remove
    }
}
