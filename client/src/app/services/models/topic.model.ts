import {Category} from './category.model';
import {Post} from './post.model';
import {User} from './user.model';

export class Topic {

    id: string;
    title: string;
    category: Category;
    initialPost: Post;
    comments: Post[];

    constructor(id: string, title: string, category: Category, textContent: string) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.initialPost = new Post(textContent,
            new User('emiliocortina', 'Emilio', 'emilio@email.com'), null);
    }

    public getCoverImage(): string {
        return this.category.coverImageUrl;
    }

    // Maybe we will want to limit the length of the preview.
    getPreview() {
        return this.initialPost.textContent;
    }

    getCreatorName() {
        return this.initialPost.user.name;
    }
}
