import { Category } from './category.model';

export class Topic {
    title: string;
    category: Category;
    textContent: string;

    constructor(title: string, category: Category, textContent: string) {
        this.title = title;
        this.category = category;
        this.textContent = textContent;
    }

    public getCoverImage(): string {
        return this.category.coverImageUrl;
    }
}
