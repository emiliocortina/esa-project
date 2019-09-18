import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-welcome-slides',
  templateUrl: './welcome-slides-modal.component.html',
  styleUrls: ['./welcome-slides-modal.component.scss'],
})
export class WelcomeSlides implements OnInit
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
    // TODO set settings as complete tutorial
    await this.modalController.dismiss();
  }
}
