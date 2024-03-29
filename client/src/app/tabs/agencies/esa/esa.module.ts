import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EsaPage } from './esa.page';

const routes: Routes = [
  {
    path: '',
    component: EsaPage
  },
  {
    path: 'mission/:id',
    loadChildren: './mission-details/mission-details.module#MissionDetailsPageModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EsaPage]
})
export class EsaPageModule {}
