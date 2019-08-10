import {User} from './user.model';

export class Post {

    id: string;
    textContent: string;
    user: User;
    created: Date;

    constructor(textContent: string, user: User, created: Date) {
        // TODO constructor with id
        this.id = 'unknown';

        this.textContent = textContent;
        this.user = user;
        this.created = created;
    }

}
