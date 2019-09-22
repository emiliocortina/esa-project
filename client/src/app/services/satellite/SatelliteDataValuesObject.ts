import { DataCategory } from '../models/satellite-data/data-category.model';

export class SatelliteDataValuesObject {

    public dataCategory;
    public keyValuePairs;
    public leastSquares: string;

    constructor(object: any) {
        this.leastSquares = (object.func) ? object.func : "";
        this.keyValuePairs = (object.keyValuePairs) ? object.keyValuePairs : [];
        if (object.dataCategory)
        {
            this.dataCategory = {
                unit: object.dataCategory.name,
                threadCategory: object.dataCategory.threadCategory.id
            }
        }
        else this.dataCategory = null;
    }


}
