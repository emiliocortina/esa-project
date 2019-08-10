export class Category {

    public id: string;
    public name: string;

    public iconUrl: string;
    public coverImageUrl: string;

    constructor(id: string, name: string, iconUrl: string, coverImageUrl: string) {
        this.id = id;
        this.name = name;
        this.iconUrl = iconUrl;
        this.coverImageUrl = coverImageUrl;
    }
}
