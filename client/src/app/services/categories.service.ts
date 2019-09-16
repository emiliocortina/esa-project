import {Injectable} from '@angular/core';
import {Category} from './models/category.model';

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

        this.addCategory('popular', 'Popular', '/assets/icon/hot.svg', 'assets/images/desert.jpg');
        this.addCategory('recent', 'Recent', '/assets/icon/satellite.svg', 'assets/images/desert.jpg');

        this.addCategory('temperatures', 'Temperatures', '/assets/icon/hot.svg', 'assets/images/desert.jpg');
        this.addCategory('pollution', 'Pollution', '/assets/icon/factory.svg', 'assets/images/pollution.jpg');
        this.addCategory('rain', 'Rain', '/assets/icon/drop.svg', 'assets/images/rain.jpg');
        this.addCategory('tides', 'Tides', '/assets/icon/wave.svg', 'assets/images/tides.jpg');
    }

    private addCategory(id: string, name: string, iconUrl: string, coverImageUrl: string): void {
        this.categories.push(new Category(id, name, iconUrl, coverImageUrl));
    }



    getDefaultCategory(): Category
    {
        return this.getCategory("popular");
    }

    public getCategories(): Category[]
    {
        return this.categories;
    }

    public getCategory(id: string): Category
    {
        return this.categories.find(cat => cat.id == id);
    }


}
