import { Category } from './category.model';

export class Topic {


    id: string;
    title: string;
    category: Category;
    textContent: string;

    constructor(title: string, category: Category, textContent: string) {
        
        // TODO constructor with id
        this.id="unknown";        
        
        this.title = title;
        this.category = category;
        this.textContent = textContent;
    }

    public getCoverImage(): string {
        return this.category.coverImageUrl;
    }
}
