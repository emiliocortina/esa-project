import {Category} from '../category.model';
import {StatsField} from './stats-field.model';

export class SatelliteStats {

    name: string;
    category: Category;
    fields: StatsField[];

    constructor(name: string, category: Category, primaryField: StatsField) {
        this.name = name;
        this.category = category;
        this.fields = [];
        this.fields.push(primaryField);
    }

    public addField(field: StatsField) {
        this.fields.push(field);
    }

    getOverviewField(): StatsField {
        return this.fields[0];
    }
}
