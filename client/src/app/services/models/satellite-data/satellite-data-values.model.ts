import { DataCategory } from './data-category.model';

/**
 * Represents the Y axis of a plot.
 */
export class SatelliteDataValues
{
    func: any; // The function that will evaluate an X value of the plot
    dataCategory: DataCategory;

    constructor(func: any, dataCategory: DataCategory) {
        this.func = func;
        this.dataCategory = dataCategory;
    }
}
