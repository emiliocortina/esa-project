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
import { ApiService } from 'src/app/services/api.service';

@Component({
	selector: 'app-create-post-modal',
	templateUrl: './create-post-modal.page.html',
	styleUrls: ['./create-post-modal.page.scss']
})
export class CreatePostModalPage implements OnInit {
	imageToShow: any;
	postTitle: string;
	postBody: string;
	selectedCategory: string;
	@Input() data: SatelliteData;
	coopImage = '../../../../assets/images/pollution.jpg';
	categories = [];
	isImageLoading: boolean;

	imageBlobUrl: any;



	constructor(
		public modalController: ModalController,
		private categoriesService: CategoriesService,
		private toastController: ToastController,
		private postsService: CoopsService,
		private threadsService: ThreadsService,
		private satelliteService: SatelliteService,
		public loadingController: LoadingController,
		private apiService: ApiService
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
		this.getThumbnail();
	}
	getThumbnail(): void {
		this.isImageLoading = true;
		this.apiService.getOpticMapImage(41.808521, 12.676104)
			.subscribe(
				(val) => {

					this.createImageFromBlob(val);
				},
				response => {
					console.log('POST in error', response);
				},
				() => {
					console.log('POST observable is now completed.');
					this.isImageLoading = false;
				});
	}
	createImageFromBlob(image: Blob) {
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			//console.log(this.imageBlobUrl);
			this.imageBlobUrl = reader.result;
			//console.log(this.imageBlobUrl);
		}, false);
		if (image) {
			reader.readAsDataURL(image);
		}
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

	private async submitThread() {

		// Create loading dialog
		const loading = await this.loadingController.create({
			message: 'Publishing...'
		});
		loading.present();

		if (this.data) {
			console.log("Submitting thread with data...");
			this.submitThreadWithData();
		}
		else {
			console.log("Submitting thread without data...");
			this.submitThreadWithoutData();
		}
	}

	private async submitThreadWithData() {
		const ids: string[] = [];

		for (var i = 0; i < this.data.values.length; i++) {
			const valDto = new SatelliteDataValuesObject(this.data.values[i]);
			try {
				const res = await this.satelliteService.createSatelliteDataValues(valDto).toPromise();
				const id = res.id;
				ids.push("" + id);
			}
			catch (err) {
				console.log(err);
				this.loadingController.dismiss();
				return;
			}
		}

		const dto = new SatelliteDataObject(this.data, ids);
		this.satelliteService.createSatelliteData(dto).subscribe((dataId) => {
			this.postsService
				.createCoop(new CoopObject({ text: this.postBody }, [dataId.id]))
				.subscribe(async (res: any) => {
					const id = res.id;
					this.threadsService.createThread(
						new ThreadObject({
							title: this.postTitle,
							category: this.selectedCategory,
							head: id
						})
					);

					this.loadingController.dismiss();
					this.generateToast('Thread successfully created!', 'success');
					this.modalController.dismiss();
				});
		});
	}

	private async submitThreadWithoutData() {
		this.postsService
			.createCoop(new CoopObject({ text: this.postBody }, []))
			.subscribe(async (res: any) => {
				const id = res.id;
				this.threadsService.createThread(
					new ThreadObject({
						title: this.postTitle,
						category: this.selectedCategory,
						head: id
					})
				);

				this.loadingController.dismiss();
				this.generateToast('Thread successfully created!', 'success');
				this.modalController.dismiss();
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
