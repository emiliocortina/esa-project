import { Component, OnInit, ViewChild } from '@angular/core';
import { ThreadsService } from '../../services/threads/threads.service';
import { Thread } from '../../services/models/threads/thread.model';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../services/models/category.model';
import { Router } from '@angular/router';
import { ModalController, PopoverController, ToastController, IonInfiniteScroll } from '@ionic/angular';
import { SettingsModal } from 'src/app/components/settings-modal/settings-modal.component';
import { CategoriesPopover } from './categories-popover/categories-popover.component';
import { StorageService } from 'src/app/services/authentication/storage.service';
import { CreatePostModalPage } from './create-post-modal/create-post-modal.page';

@Component({
	selector: 'app-tab1',
	templateUrl: 'explore.page.html',
	styleUrls: [ 'explore.page.scss' ]
})
export class ExplorePage implements OnInit {
	@ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

	page = 0;
	threads: Thread[];

	currentCategory: any;
	categoriesToggle: boolean;
	avatarId: string;

	elements = 10;
	returned: number;

	filter = {};

	constructor(
		private threadsService: ThreadsService,
		private categoriesService: CategoriesService,
		private router: Router,
		private modalController: ModalController,
		private popoverController: PopoverController,
		private userService: StorageService,
		private toastController: ToastController
	) {
		this.currentCategory = { iconUrl: '', name: 'Featured' };
	}

	ngOnInit(): void {
		this.threads = [];
		// this.threadsService.loadPopularThreads(this.threads);
		// this.loadPosts();
		this.loadThreads();
		this.avatarId = this.userService.getAvatarId();
		this.userService.onUserChange.push((user) => {
			if (user && user.avatarId) {
				this.avatarId = user.avatarId;
			} else {
				this.avatarId = null;
			}
		});
	}

	async createCooper() {
		if (!this.userService.isAuthenticated()) {
			const toast = await this.toastController.create({
				message: 'You need to be logged in to submit a post.',
				color: 'dark',
				showCloseButton: true,
				duration: 3000
			});
			toast.present();
			this.router.navigate([ '/profile/login' ]);
		} else {
			let modal = await this.modalController.create({ component: CreatePostModalPage });

			modal.onDidDismiss().then(() => {
				this.threads = [];
				this.loadThreads();
			});

			return await modal.present();
		}
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

	changeFilter(categoryName) {
		this.filter = 'category(' + categoryName + ')';
		this.threads = [];
		this.loadThreads();
	}

	deleteFilter() {
		this.filter = {};
		this.threads = [];
		this.loadThreads();
	}

	// = = = = = = = = = = = = THREADS = = = = = = = = = = = = //

	goToSearchPage() {
		this.router.navigate([ '/search' ]);
	}

	loadThreads(infiniteScroll?) {
		this.threadsService.loadThreads(this.filter, this.threads, this.elements, this.page, (res: number) => {
			this.returned = res;
			if (infiniteScroll) {
				infiniteScroll.target.complete();
			}
		});
	}

	loadMorePosts(infiniteScroll) {
		setTimeout(() => {
			infiniteScroll.target.complete();

			if (this.returned < this.elements) {
				infiniteScroll.target.disabled = true;
			} else {
				this.page++;
				this.loadThreads(infiniteScroll);
			}
		}, 500);
	}
}
