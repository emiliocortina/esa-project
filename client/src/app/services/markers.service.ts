import { Injectable } from '@angular/core';
import { DataMarker } from './models/satellite-data/data-marker.model';

@Injectable({
    providedIn: 'root'
})
export class MarkersService {

    private markers: DataMarker[];

    constructor() {
        this.markers = [];
        this.setUpMarkers();
    }

    private setUpMarkers(): void
    {
        this.addMarker("Paris Agreement [Sealed]", new Date("2015-12-12"), "");
        this.addMarker("Paris Agreement [Signed]", new Date("2016-04-22"), "");
        this.addMarker("Paris Agreement [Effective]", new Date("2016-11-04"), "");
        
        this.addMarker("Kyoto Protocol [Signed]", new Date("1997-12-11"), "");
        this.addMarker("Kyoto Protocol [Effective]", new Date("2005-02-16"), "");
        this.addMarker("Kyoto Protocol [Expired]", new Date("2012-12-31"), "");
        
        var un_ccc = "U.N. Climate Change Conference";
        this.addMarker(un_ccc, new Date("1995-04-07"), "");
        this.addMarker(un_ccc, new Date("1996-07-18"), "");
        this.addMarker(un_ccc, new Date("1997-12-01"), "");
        this.addMarker(un_ccc, new Date("1998-11-02"), "");
        this.addMarker(un_ccc, new Date("1999-10-25"), "");
        this.addMarker(un_ccc, new Date("2000-11-13"), "");
        this.addMarker(un_ccc, new Date("2001-10-29"), "");
        this.addMarker(un_ccc, new Date("2002-10-23"), "");
        this.addMarker(un_ccc, new Date("2003-11-01"), "");
        this.addMarker(un_ccc, new Date("2004-12-06"), "");
        this.addMarker(un_ccc, new Date("2005-11-28"), "");
        this.addMarker(un_ccc, new Date("2006-11-06"), "");
        this.addMarker(un_ccc, new Date("2007-12-03"), "");
        this.addMarker(un_ccc, new Date("2008-12-01"), "");
        this.addMarker(un_ccc, new Date("2009-12-07"), "");
        this.addMarker(un_ccc, new Date("2010-11-29"), "");
        this.addMarker(un_ccc, new Date("2011-11-28"), "");
        this.addMarker(un_ccc, new Date("2012-11-26"), "");
        this.addMarker(un_ccc, new Date("2013-11-11"), "");
        this.addMarker(un_ccc, new Date("2014-12-01"), "");
        this.addMarker(un_ccc, new Date("2015-11-30"), "");
        this.addMarker(un_ccc, new Date("2016-11-07"), "");
        this.addMarker(un_ccc, new Date("2017-11-06"), "");
        this.addMarker(un_ccc, new Date("2018-12-02"), "");
        this.addMarker(un_ccc, new Date("2019-12-02"), "");
        
    }

    private addMarker(title: string, date: Date, description: string): void {
        this.markers.push(new DataMarker(title, date, description));
    }

    public getAllMarkers(): DataMarker[] {
        return this.markers;
    }

    public getInRange(start: Date, end: Date) : DataMarker[]
    {
        var result = [];
        this.markers.forEach(marker => {

            if (marker.date.getTime() < start.getTime())
                return;

            if (marker.date.getTime() >= end.getTime())
                return;

            result.push(marker);
        });
        return result;
    }


}
