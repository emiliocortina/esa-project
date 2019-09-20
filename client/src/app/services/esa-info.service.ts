import {Injectable} from '@angular/core';
import {EsaMission} from './models/esa-mission';

@Injectable({
    providedIn: 'root'
})
export class EsaInfoService {

    missions: EsaMission[];

    constructor() {
        this.missions = [];

        // Sentinel 1
        this.missions.push(this.getSentinel1());

        // Sentinel 2
        this.missions.push(this.getSentinel2());

        // Sentinel 3

        this.missions.push(this.getSentinel3());

        // Sentinel 4, 5 & 5P

        this.missions.push(this.getSentinel45P());
    }

    public getMissions(): EsaMission[] {
        return this.missions;
    }

    public getMission(id: string): EsaMission {
        return this.missions.find((mission) => mission.id === id);
    }

    private getSentinel1() {
        const sentinel1 = new EsaMission('sentinel1', 'Sentinel 1',
            'https://www.esa.int/spaceinimages/Images/2019/09/Baja_California_Mexico');
        sentinel1.previewLabels.push('The first in the series, Sentinel-1, carries an ' +
            'advanced radar instrument to provide an all-weather, day-and-night supply of imagery of Earth’s surface.');

        /*sentinel1.contentParagraphs.push('This Copernicus Sentinel-1 image contains three ' +
            'separate images overlaid on top of each other. Captured on 30 April, 12 May and 17 June, the different ' +
            'colours represent changes that occurred on the ground.');
         */
        sentinel1.contentParagraphs.push('This Copernicus Sentinel-1 image takes us just south of the US border, ' +
            'to the region of Baja California in northwest Mexico. Its capital city, Mexicali, is visible top left of the image.');
        sentinel1.contentParagraphs.push('This false colour image contains three separate images overlaid on top of each other. ' +
            'Captured on 30 April, 12 May and 17 June, the different colours represent changes that occurred on the ground.');
        sentinel1.contentParagraphs.push('The Colorado River, which forms the border between Baja California and Sonora, ' +
            'can be seen cutting through the rich and colourful patchwork of agricultural land at the top right of the ' +
            'image, before it fans out and splits into multiple streams. Flowing for over 2300 km, the Colorado River ' +
            'rises in the central Rocky Mountains in Colorado, flows through the Grand Canyon before crossing the Mexican ' +
            'border and emptying into the Gulf of California, also known as the Sea of Cortez. ');
        sentinel1.contentParagraphs.push('The Colorado River delta once covered a large area of land and, owing to its ' +
            'nutrients carried downstream, supported a large population of plant and bird life. However today, water ' +
            'that flows is trapped by dams and is used for residential use, electricity generation as well as crop irrigation ' +
            'for the nearby Imperial Valley and Mexicali Valley. The reduction in flow by dams and diversions traps the majority ' +
            'of the river’s sediments before they reach the Gulf of California, impacting water quality.');
        return sentinel1;
    }

    private getSentinel2() {
        const sentinel2 = new EsaMission('sentinel2', 'Sentinel 2',
            'https://www.esa.int/spaceinimages/Images/2019/09/Australian_bushfires');
        sentinel2.previewLabels.push('The objective of SENTINEL-2 is land monitoring, ' +
            'and the mission will be composed of two polar-orbiting satellites providing ' +
            'high-resolution optical imagery.');
        sentinel2.previewLabels.push('Vegetation, soil and coastal areas are among ' +
            'the monitoring objectives. The first SENTINEL-2 satellite was launched in June 2015.');
        sentinel2.contentParagraphs.push('Australia is tackling multiple bushfires that have broken ' +
            'out across New South Wales and Queensland over the past few days.');
        sentinel2.contentParagraphs.push('In this image captured by the Copernicus Sentinel-2 mission on ' +
            '8 September, fires burning in the Yuraygir National Park and Shark Creek area are visible. Fires ' +
            'are also burning to the north and south of the villages of Angourie and Wooloweyah. See the image ' +
            'at its full resolution to zoom in on the area.');
        sentinel2.contentParagraphs.push('The flames, which were said to have been whipped up by strong winds, ' +
            'have now been contained. More than 600 firefighters have been deployed to tackle the fires, ' +
            'and multiple homes and outbuildings have been damaged.');
        return sentinel2;
    }

    private getSentinel3() {
        const sentinel3 = new EsaMission('sentinel3', 'Sentinel 3',
            'https://www.esa.int/spaceinimages/Images/2019/09/Dorian_brings_destruction');
        sentinel3.previewLabels.push('The primary objective of SENTINEL-3 is marine observation,' +
            ' and it will study sea-surface topography, sea and land surface temperature, ocean and land colour.');
        sentinel3.previewLabels.push('Composed of three satellites, the mission\'s primary instrument is a radar ' +
            'altimeter, but the polar-orbiting satellites will carry multiple instruments, including optical imagers.');
        sentinel3.previewLabels.push('This Copernicus Sentinel-3 image features Hurricane Dorian ' +
            'as it pummels the Bahamas on 2 September 2019 at 15:16 GMT (11:16 EDT). This mighty ' +
            'storm has been parked over the northwest Bahamas for more than 24 hours unleashing a ' +
            'siege of devastation. Storm surges, wind and rain have claimed at least five lives and ' +
            'destroyed homes and infrastructure. Dorian is reported to be one of the most powerful ' +
            'Atlantic hurricanes on record. Residents in Florida, US, are also starting to feel the ' +
            'effects of Dorian, though its path is difficult to predict as it creeps slowly over the ' +
            'Bahamas. However, the US National Hurricane Center expect life-threatening storm surges ' +
            'along Florida’s east coast and along the coasts of Georgia and South Carolina. As the US ' +
            'authorities respond to the devastation, Europe’s Copernicus Emergency Mapping Service has ' +
            'been activated to provide flood maps based on satellite data.');;
        return sentinel3;
    }

    private getSentinel45P() {
        const sentinel4 = new EsaMission('sentinel45P', 'Sentinel 4, 5 & 5P',
            'https://esamultimedia.esa.int/docs/EarthObservation/Copernicus_Brief_AirQuality_' +
            'Issue10_September2013.pdf');
        sentinel4.previewLabels.push('Sentinel-4 and Sentinel-5 will be carried on meteorological ' +
            'satellites and will provide data for atmospheric composition monitoring from geostationary and polar ' +
            'orbits, respectively.');
        sentinel4.previewLabels.push('In addition, a Sentinel-5 Precursor mission is being\n' +
            'developed to reduce data gaps between Envisat, in particular the Sciamachy ' +
            'instrument, and the launch of Sentinel-5.');
        sentinel4.contentParagraphs.push('Using data from Copernicus Sentinel-5P, the image shows the difference in ' +
            'carbon monoxide in the air between July 2019 and August 2019 over the Amazon.');
        sentinel4.contentParagraphs.push('This pollutant is often associated with traffic, but here we see the ' +
            'increase in atmospheric concentrations following the fires.');
        sentinel4.contentParagraphs.push('Naturally, once in the air, it can cause problems for humans by ' +
            'reducing the amount of oxygen that can be transported in the bloodstream.');
        return sentinel4;
    }
}
