import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../../services/threads.service';
import { Thread } from '../../services/models/threads/thread.model';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../services/models/category.model';
import { Router } from '@angular/router';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { SettingsModal } from 'src/app/components/settings-modal/settings-modal.component';
import { CategoriesPopover } from './categories-popover/categories-popover.component';
import { StorageService } from 'src/app/services/authentication/storage.service';
import { CreatePostModalPage } from './create-post-modal/create-post-modal.page';

@Component({
    selector: 'app-tab1',
    templateUrl: 'explore.page.html',
    styleUrls: ['explore.page.scss']
})
export class ExplorePage implements OnInit {

    page: number = 0;
    threads: Thread[];

    currentCategory: Category;
    categoriesToggle: boolean;
    avatarId: string;


    constructor(
        private threadsService: ThreadsService,
        private categoriesService: CategoriesService,
        private router: Router,
        private modalController: ModalController,
        private popoverController: PopoverController,
        private userService: StorageService,
        private toastController: ToastController
    ) {

        this.currentCategory = this.categoriesService.getDefaultCategory();
    }

    ngOnInit(): void {
        this.threads = [];
        //this.threadsService.loadPopularThreads(this.threads);
        //this.loadPosts();
        this.loadThreads();
        this.avatarId = this.userService.getAvatarId();
    }

    async createCooper() {

        const modal = await this.modalController.create({
            component: CreatePostModalPage
        });
        return await modal.present();

        /*
        if (!this.userService.isAuthenticated()) {
            const toast = await this.toastController.create({
                message: 'You need to be logged in to submit a post.',
                color: 'dark',
                showCloseButton: true,
                duration: 3000
              });
              toast.present();
        } else {
            const modal = await this.modalController.create({
                component: CreatePostModalPage
            });
            return await modal.present();
        }
        */
    }

    // = = = = = = = = = = = = CATEGORIES = = = = = = = = = = = = //

    async openCategoryPopup() {
        const popover = await this.popoverController.create({
            component: CategoriesPopover,
            componentProps: {
                explorePage: this
            },
            translucent: true
        });
        return await popover.present();
    }

    toggleShowCategories(): void {
        this.categoriesToggle = !this.categoriesToggle;
    }

    isShowingCategories(): boolean {
        return this.categoriesToggle;
    }


    // = = = = = = = = = = = = THREADS = = = = = = = = = = = = //

    goToSearchPage() {
        this.router.navigate(['/search']);
    }

    readThread(id: string) {
        this.router.navigate(['/thread', id]);
    }

    loadThreads(infiniteScroll?) {
        this.threadsService
            .loadPopularThreads(this.threads, this.page, res => {
                if (infiniteScroll)
                    infiniteScroll.complete();
            });
    }

    loadMorePosts(infiniteScroll) {
        this.page++;
        this.loadThreads(infiniteScroll);
    }


}
