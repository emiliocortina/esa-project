import { Category } from '../category.model';
import { Post } from './post.model';
import { User } from '../users/user';

export class Thread {

    id: string;
    title: string;
    category: Category;
    initialPost: Post;
    author: User;

    constructor(id: string, title: string, category: Category, initialCoop: Post = null, author: User = null) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.initialPost = initialCoop;
        this.author = author;
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
