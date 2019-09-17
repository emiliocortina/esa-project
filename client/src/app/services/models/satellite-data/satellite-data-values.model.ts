import { DataCategory } from './data-category.model';

/**
 * Represents the Y axis of a plot.
 */
export class SatelliteDataValues
{
    func: any; // The function that will evaluate an X value of the plot
    dataCategory: DataCategory;

    // TODO remove this after we achieve quatratic approximation
    keyValuePairs;


    constructor(func: any, dataCategory: DataCategory, keyValuePairs) {
        this.func = func;
        this.dataCategory = dataCategory;
        this.keyValuePairs = keyValuePairs; // TODO remove
    }
}
