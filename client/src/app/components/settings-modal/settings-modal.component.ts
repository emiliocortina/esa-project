import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModal implements OnInit
{

  constructor(
      private modalController: ModalController,
      private settings: SettingsService
    ) 
  {

  }

  ngOnInit() {}


  async close()
  {
    await this.modalController.dismiss();
  }

  // BIG ASS TODO

  
}
