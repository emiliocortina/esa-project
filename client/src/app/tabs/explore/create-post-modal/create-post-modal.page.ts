import {Component, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {CategoriesService} from 'src/app/services/categories.service';

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
                private toastController: ToastController
    ) {
    }

    ngOnInit() {
        this.categories = this.categoriesService.getCategories();
        console.log(this.categories);
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

    private submitThread() {
        //const thread = new Thread('0', this.postTitle, this.stats.category, this.postBody);
        // TODO
        // this.threadsService.submitThread(thread);
        var postBody = {
            text: this.postBody
        }

        var threadBody = {
            title: this.postTitle,
            //TODO
            category: this.selectedCategory
        };

        console.log(postBody);
        console.log(threadBody);
        this.modalController.dismiss({success: 'Thread successfully created!'});
    }
}
