import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController, LoadingController } from '@ionic/angular';
import { CategoriesService } from 'src/app/services/categories.service';
import { CoopsService } from 'src/app/services/threads/coops.service';
import { CoopObject } from 'src/app/services/threads/CoopObject';
import { ThreadsService } from 'src/app/services/threads/threads.service';
import { ThreadObject } from 'src/app/services/threads/ThreadObject';
import { SatelliteData } from 'src/app/services/models/satellite-data/satellite-data.model';
import { SatelliteService } from 'src/app/services/satellite/satellite.service';
import { SatelliteDataValuesObject } from 'src/app/services/satellite/SatelliteDataValuesObject';
import { SatelliteDataObject } from 'src/app/services/satellite/SatelliteDataObject';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.page.html',
  styleUrls: ['./create-post-modal.page.scss'],
})
export class CreatePostModalPage implements OnInit {

  postTitle: string;
  postBody: string;
  selectedCategory: string;
  @Input() data: SatelliteData;

  categories = [];

  constructor(public modalController: ModalController,
    private categoriesService: CategoriesService,
    private toastController: ToastController,
    private postsService: CoopsService,
    private threadsService: ThreadsService,
    private satelliteService: SatelliteService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();
    this.selectedCategory = this.categories[0].id;
    /*
     <div class="chip" *ngFor="let field of stats.fields">
        <ion-chip outline color="{{field.color}}" (click)="field.isChecked=false" *ngIf="field.isChecked">
          <ion-label></ion-label>
          <ion-icon name="close"></ion-icon>
        </ion-chip>
      </div>
    */
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

  async publishPost() {
    const isPostEmpty = this.isPostEmpty();
    if (isPostEmpty) {
      this.generateToast(isPostEmpty, 'danger');
    } else {
      this.submitThread();
    }
  }

  private isPostEmpty(): string {
    if (!this.postTitle || this.postTitle.trim().length === 0) {
      if (!this.postBody || this.postBody.trim().length === 0) {
        return 'Cannot submit an empty post.';
      } else {
        return 'Post title must not be empty.';
      }
    } else {
      if (!this.postBody || this.postBody.trim().length === 0) {
        return 'Post body must not be empty.';
      }
    }
    return null;
  }



  private async submitThread()
  {
    // Create loading dialog
    const loading = await this.loadingController.create({
        message: 'Getting data near your location...'
    });
    loading.present();

    var ids : string[] = [];
    for (var i = 0; i < this.data.values.length; i ++)
    {
      var valDto = new SatelliteDataValuesObject(this.data.values[i]);
      try {
        var res = await this.satelliteService.createSatelliteDataValues(valDto).toPromise();
        var id = res.id;
      }
      catch (err)
      {
        console.log(err);
        this.loadingController.dismiss();
        return;
      }
      console.log("Satellite data values id = " + id);
      ids.push("" + id);
    }

    var dto = new SatelliteDataObject(this.data, ids);
    this.satelliteService.createSatelliteData(dto)
      .subscribe(dataId => {

        this.postsService.createCoop(new CoopObject({text: this.postBody }, [dataId.id]))
          .subscribe(async (res: any) => {
            let id = res.id;
            this.threadsService.createThread(new ThreadObject({
                title: this.postTitle,
                category: this.selectedCategory,
                head: id
              }));
    
            this.loadingController.dismiss();
            this.generateToast("Thread successfully created!", 'success');
            this.modalController.dismiss();
          });

      });

  }

  async generateToast(msg: string, col: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: col,
      showCloseButton: true,
      duration: 3000
    });
    toast.present();
  }
}
