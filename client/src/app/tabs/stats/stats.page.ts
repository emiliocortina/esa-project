import {Component, OnInit} from '@angular/core';
import {SatelliteService} from '../../services/satellite.service';
import {SatelliteData} from '../../services/models/satellite-data/satellite-data.model';

@Component({
    selector: 'app-tab2',
    templateUrl: 'stats.page.html',
    styleUrls: ['stats.page.scss']
})
export class StatsPage implements OnInit {

    data: SatelliteData[];

    constructor(private satelliteService: SatelliteService) {
    }

    ngOnInit(): void {
        this.data = [];
        this.satelliteService.fetchSatelliteData(this.data);
    }

}
