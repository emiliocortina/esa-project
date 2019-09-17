import {Category} from '../category.model';

export class DataCategory {

    name: string;
    threadCategory: Category;

    constructor(name: string, threadCategory: Category)
    {
        this.name = name;
        this.threadCategory = threadCategory;
    }

}
