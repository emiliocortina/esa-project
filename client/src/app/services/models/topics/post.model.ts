import {User} from '../user.model';
import {SatelliteStats} from '../satellite-data/satellite-stats.model';

export class Post {

    id: string;
    textContent: string;
    user: User;
    created: Date;
    satelliteData: SatelliteStats[];

    constructor(id: string, textContent: string, user: User, created: Date, satelliteData?: SatelliteStats[]) {
        this.id = id;
        this.textContent = textContent;
        this.user = user;
        this.created = created;
        if (satelliteData) {
            this.satelliteData = satelliteData;
        }
    }

}
