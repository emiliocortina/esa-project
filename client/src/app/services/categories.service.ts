import { Injectable } from '@angular/core';
import { Category } from './models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    private categories: Category[];

    constructor() {
        this.categories = [];

        this.setUpCategories();
    }

    // TODO maybe take categories from database or json file
    private setUpCategories(): void {
        this.addCategory('temperatures', 'Temperatures', "dataset/2mTemperature", '/assets/icon/hot.svg', 'assets/images/desert.jpg');
        this.addCategory('pollution', 'Pollution', "layer/no2", '/assets/icon/factory.svg', 'assets/images/pollution.jpg');
        this.addCategory('rain', 'Rain', "layer/ozone", '/assets/icon/drop.svg', 'assets/images/rain.jpg');
        this.addCategory('tides', 'Tides', "layer/ozone", '/assets/icon/wave.svg', 'assets/images/tides.jpg');
    }

    private addCategory(id: string, name: string, apiRoute: string, iconUrl: string, coverImageUrl: string): void {
        this.categories.push(new Category(id, name, apiRoute, iconUrl, coverImageUrl));
    }

    getDefaultCategory(): Category {
        return this.getCategory("temperatures");
    }

    public getCategories(): Category[] {
        return this.categories;
    }

    public getCategory(id: string): Category {
        id = id.toLowerCase();
        return this.categories.find(cat => cat.id == id);
    }


}
