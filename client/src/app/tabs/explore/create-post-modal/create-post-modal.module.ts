import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreatePostModalPage } from './create-post-modal.page';

/*
const routes: Routes = [
  {
    path: '',
    component: CreatePostModalPage
  }
];
*/

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule//,
    //RouterModule.forChild(routes)
  ],
  entryComponents: [CreatePostModalPage],
  declarations: [CreatePostModalPage],
  exports: [CreatePostModalPage]
})
export class CreatePostModalPageModule {
  
}