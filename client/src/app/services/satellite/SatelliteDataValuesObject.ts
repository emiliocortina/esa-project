import { DataCategory } from '../models/satellite-data/data-category.model';

export class SatelliteDataValuesObject {

    public dataCategory;
    public function: string;

    constructor(object: any) {
        this.function = (object.func) ? object.func : "";
        
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
