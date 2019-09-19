import { DataCategory } from './data-category.model';
import { DataMarker } from './data-marker.model';

/**
 * Represents the Y axis of a plot.
 */
export class SatelliteDataValues
{

    start: Date;
    end: Date;

    func: any; // The function that will evaluate an X value of the plot
    dataCategory: DataCategory;

    markers: DataMarker[];

    // TODO remove this after we achieve quatratic approximation
    keyValuePairs;


    constructor(start: Date, end: Date, func: any, dataCategory: DataCategory,
            markers: DataMarker[], keyValuePairs) {

        this.start = start;
        this.end = end;
        this.func = func;
        this.dataCategory = dataCategory;
        this.markers = markers;

        this.keyValuePairs = keyValuePairs; // TODO remove
    }
}
