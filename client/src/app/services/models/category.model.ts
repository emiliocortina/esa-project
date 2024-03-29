export class Category {

    public id: string;
    public name: string;

    public iconUrl: string;
    public coverImageUrl: string;

    public apiRoute: string;

    public title: string; //TODO obtain this from API

    // Categories are both used by threads and by satellite stats.
    constructor(id: string, name: string, apiRoute: string, iconUrl: string, coverImageUrl: string, title: string) {
        this.id = id;
        this.name = name;
        this.iconUrl = iconUrl;
        this.coverImageUrl = coverImageUrl;
        this.apiRoute = apiRoute;
        this.title = title;
    }
}
