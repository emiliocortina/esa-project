
export class SatelliteDataObject {

    public satelliteDataValues: string[];
    public start: Date;
    public end: Date;

    constructor(object: any, satelliteDataValues: string[]) {
        this.start = (object.start) ? object.start : null;
        this.end = (object.end) ? object.end : null;
        this.satelliteDataValues = satelliteDataValues;
    }


}
