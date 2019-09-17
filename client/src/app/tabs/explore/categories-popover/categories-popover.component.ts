import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ExplorePage } from '../explore.page';
import { Category } from 'src/app/services/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-popover',
  templateUrl: './categories-popover.component.html',
  styleUrls: ['./categories-popover.component.scss'],
})
export class CategoriesPopover implements OnInit
{

  explorePage: ExplorePage;

  cooperCategories: Category[];

  constructor(
      public popoverController: PopoverController,
      private categoriesService : CategoriesService
    ) 
  {
    this.cooperCategories = this.categoriesService.getCategories();
  }

  ngOnInit() {}


  async close()
  {
    await this.popoverController.dismiss();
  }

  selectCategory(category: Category)
  {
    this.explorePage.currentCategory = category;
    this.close();
  }

  
}
