import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Category } from 'src/app/services/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { SignupPage } from '../signup.page';

@Component({
  selector: 'app-avatar-popover',
  templateUrl: './avatar-popover.component.html',
  styleUrls: ['./avatar-popover.component.scss'],
})
export class AvatarPopover implements OnInit
{

  signupPage: SignupPage;

  cooperCategories: Category[];

  constructor(
      public popoverController: PopoverController
    ) 
  {
  }

  ngOnInit() {}


  async close()
  {
    await this.popoverController.dismiss();
  }

  selectAvatar(avatarid: String)
  {
    this.signupPage.selectedAvatarId = avatarId;
    this.close();
  }

  
}
