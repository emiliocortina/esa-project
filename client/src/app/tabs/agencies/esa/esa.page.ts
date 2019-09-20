import {Component, OnInit} from '@angular/core';
import {EsaMission} from '../../../services/models/esa-mission';
import {EsaInfoService} from "../../../services/esa-info.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-esa',
    templateUrl: './esa.page.html',
    styleUrls: ['./esa.page.scss'],
})
export class EsaPage implements OnInit {

    missions: EsaMission[];

    constructor(private esaService: EsaInfoService, private router: Router) {
        this.missions = esaService.getMissions();
    }

    ngOnInit() {
    }
}
