import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EsaInfoService} from '../../../../services/esa-info.service';
import {EsaMission} from '../../../../services/models/esa-mission';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.page.html',
  styleUrls: ['./mission-details.page.scss'],
})
export class MissionDetailsPage implements OnInit, OnDestroy {

  private routerSubscription: any;
  private mission: EsaMission;

  constructor(private esaService: EsaInfoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routerSubscription = this.route
        .params
        .subscribe(params => {
          this.setMissionId(params.id);
        });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  private setMissionId(id: string) {
    this.mission = this.esaService.getMission(id);
  }
}
