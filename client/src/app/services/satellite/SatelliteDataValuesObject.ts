import { DataCategory } from '../models/satellite-data/data-category.model';

export class SatelliteDataValuesObject {

    public dataCategory;
    public leastSquares: string;

    /*
    function: { type: String, required: true },
	dataCategory: {
		unit: { type: String, required: true },
		threadCategory: { type: String, required: true }
    }
    */
    

    constructor(object: any) {
        this.leastSquares = (object.func) ? object.func : "";
        
        if (object.dataCategory)
        {
            this.dataCategory = {
                unit: object.dataCategory.name,
                threadCategory: object.dataCategory.threadCategory.id
            }
        }
        else this.dataCategory = null;

        console.log("ME CAGO EN DIOS");
        var obj = { 
            leastSquares: this.leastSquares, 
            dataCategory: this.dataCategory
        };
        console.log(obj)
    }


}
