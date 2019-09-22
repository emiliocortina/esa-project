
export class SatelliteDataObject {

    public satelliteDataValues: string[];
    public latitude: number;
    public longitude: number;
    public start: Date;
    public end: Date;

    constructor(object: any, satelliteDataValues: string[]) {
        this.start = (object.start) ? object.start : null;
        this.end = (object.end) ? object.end : null;
        this.latitude = (object.latitude) ? object.latitude : 0;
        this.longitude = (object.longitude) ? object.longitude : 0;
        this.satelliteDataValues = satelliteDataValues;
    }


}
