import { Category } from '../category.model';
import { EsaMission } from "../esa-mission";
import { EsaInfoService } from "../../esa-info.service";

export class DataCategory {

    name: string;
    threadCategory: Category;
    esaMission: EsaMission;
    title: string; //TODO obtain this data from the API

    constructor(name: string, threadCategory: Category, private esaService: EsaInfoService) {
        this.name = name;
        this.threadCategory = threadCategory;
        this.title = threadCategory.title;
        this.setSentinel();
    }

    private setSentinel() {
        this.esaMission = this.esaService.getMission('sentinel45P');
    }
}
