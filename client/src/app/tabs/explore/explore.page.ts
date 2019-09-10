import {Component, OnInit} from '@angular/core';
import {ThreadsService} from '../../services/threads.service';
import {Thread} from '../../services/models/threads/thread.model';
import {CategoriesService} from '../../services/categories.service';
import {Category} from '../../services/models/category.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab1',
    templateUrl: 'explore.page.html',
    styleUrls: ['explore.page.scss']
})
export class ExplorePage implements OnInit {

    page: number = 0;
    threads: Thread[];

    categories: Category[];
    categoriesToggle: boolean;


    constructor(
        private threadsService: ThreadsService,
        private categoriesService: CategoriesService,
        private router: Router
    ) {

        this.categories = this.categoriesService.getCategories();
    }

    ngOnInit(): void {
        this.threads = [];
        //this.threadsService.loadPopularThreads(this.threads);
        //this.loadPosts();
        this.loadThreads();
    }


    // = = = = = = = = = = = = CATEGORIES = = = = = = = = = = = = //

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