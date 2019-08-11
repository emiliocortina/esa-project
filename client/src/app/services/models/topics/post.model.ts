import {User} from '../user.model';

export class Post {

    id: string;
    textContent: string;
    user: User;
    created: Date;

    constructor(id: string, textContent: string, user: User, created: Date) {
        this.id = id;

        this.textContent = textContent;
        this.user = user;
        this.created = created;
    }

}
