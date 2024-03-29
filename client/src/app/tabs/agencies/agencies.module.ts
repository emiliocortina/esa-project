import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgenciesPage } from './agencies.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'esa'
  },
  {
    path: 'esa',
    loadChildren: './esa/esa.module#EsaPageModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgenciesPage]
})
export class AgenciesPageModule {}
