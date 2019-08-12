import { User } from './user';

export class Session {
    public status: string;
    public token: string;
    public user: User;
}
