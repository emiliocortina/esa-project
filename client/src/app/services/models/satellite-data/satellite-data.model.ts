import {Category} from '../category.model';
import {DataField} from './data-field.model';

export class SatelliteData {

    name: string;
    category: Category;
    fields: DataField[];

    constructor(name: string, category: Category, field: DataField) {
        this.name = name;
        this.category = category;
        this.fields = [];
        this.fields.push(field);
    }

    public addField(field: DataField) {
        this.fields.push(field);
    }

    getOverviewField(): DataField {
        return this.fields[0];
    }
}
