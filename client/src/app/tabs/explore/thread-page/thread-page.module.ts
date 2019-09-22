import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ThreadPage } from './thread-page.page';
import { ExpandableComponentModule } from 'src/app/components/expandable/expandable.module';
import { SatelliteDataDisplayModule } from 'src/app/components/satelliteData/satellite-data-display/satellite-data-display.module';

const routes: Routes = [
  {
    path: '',
    component: ThreadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SatelliteDataDisplayModule,
    ExpandableComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ThreadPage]
})
export class ThreadPageModule {}
