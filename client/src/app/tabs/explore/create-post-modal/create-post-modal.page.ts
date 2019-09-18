import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/threads/posts.service';
import { PostObject } from 'src/app/services/threads/PostObject';
import { ThreadsService } from 'src/app/services/threads/threads.service';
import { ThreadObject } from 'src/app/services/threads/ThreadObject';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.page.html',
  styleUrls: ['./create-post-modal.page.scss'],
})
export class CreatePostModalPage implements OnInit {

  postTitle: string;
  postBody: string;
  selectedCategory: string;

  categories = [];

  constructor(public modalController: ModalController,
    private categoriesService: CategoriesService,
    private toastController: ToastController,
    private postsService: PostsService,
    private threadsService: ThreadsService
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
      const toast = await this.toastController.create({
        message: isPostEmpty,
        color: 'dark',
        showCloseButton: true,
        duration: 3000
      });
      toast.present();
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

  private async submitThread() {
    //const thread = new Thread('0', this.postTitle, this.stats.category, this.postBody);
    // TODO
    // this.threadsService.submitThread(thread);
    var postBody =

      this.postsService.createPost(new PostObject({
        text: this.postBody
      })).subscribe((res: any) => {
        let id = res.id;
        console.log(this.threadsService.createThread(new ThreadObject({
          title: this.postTitle,
          category: this.selectedCategory,
          head: id
        })));

        this.modalController.dismiss({ success: 'Thread successfully created!' });
      });
  }
}
