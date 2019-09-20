
import { SatelliteData } from '../satellite-data/satellite-data.model';
import { User } from '../users/user';

export class Post {

    id: string;
    textContent: string;
    user: User;
    created: Date;
    satelliteData: SatelliteData[];
    comments: Post[];

    constructor(id: string, textContent: string, user: User, created: Date, satelliteData?: SatelliteData[]) {
        this.id = id;
        this.textContent = textContent;
        this.user = user;
        this.created = created;
        if (satelliteData) {
            this.satelliteData = satelliteData;
        }
        this.comments = [];
    }

    addComments(list: Post[]) {
        list.forEach(c => {
            this.comments.push(c);
        });
    }

}
