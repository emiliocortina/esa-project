import {Category} from '../category.model';
import {Post} from './post.model';
import {User} from '../users/user';

export class Thread {

    id: string;
    title: string;
    category: Category;
    initialPost: Post;

    constructor(id: string, title: string, category: Category, textContent: string) {
        this.id = id;
        this.title = title;
        this.category = category;
        // TODO Cambiar esto q es pa los dummies
        this.initialPost = new Post('0', textContent,
            new User('emiliocortina', 'Emilio', 'emilio@email.com'), new Date());
        
        // TODO remove dummy comments
        for (let i = 0; i < 10; i++) {
            this.initialPost.comments.push(new Post('0',
                'Qué bacaneria es estar en el campo disfrutando y coriando con un corito sano.',
                new User('emiliocortina' + i, 'Emilio' + i, 'emilio' + i + '@email.com'),
                new Date()));
        }
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
