import {Category} from '../category.model';

export class DataMarker {

    name: string;
    date: Date;
    description: string;

    constructor(name: string, date: Date, descrption: string)
    {
        this.name = name;
        this.date = date;
        this.description = descrption;
    }

}
