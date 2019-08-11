import {Component, OnInit} from '@angular/core';
import {TopicsService} from '../services/topics.service';
import {Topic} from '../services/models/topic.model';
import {CategoriesService} from '../services/categories.service';
import {Category} from '../services/models/category.model';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab1',
    templateUrl: 'topics.page.html',
    styleUrls: ['topics.page.scss']
})
export class TopicsPage implements OnInit {

    topicsPage: number = 0;
    topics: Topic[];

    categories: Category[];
    categoriesToggle: boolean;


    constructor(
        private topicsService: TopicsService,
        private categoriesService: CategoriesService,
        private router: Router
    ) {

        this.categories = this.categoriesService.getCategories();
    }

    ngOnInit(): void {
        this.topics = [];
        //this.topicsService.loadPopularTopics(this.topics);
        //this.loadPosts();
        this.loadPosts();
    }


    // = = = = = = = = = = = = CATEGORIES = = = = = = = = = = = = //

    toggleShowCategories(): void {
        this.categoriesToggle = !this.categoriesToggle;
    }

    isShowingCategories(): boolean {
        return this.categoriesToggle;
    }


    // = = = = = = = = = = = = POSTS = = = = = = = = = = = = //

    goToSearchPage() {
        this.router.navigate(['/search']);
    }

    readPost(id: string) {
        this.router.navigate(['/post', id]);
    }

    loadPosts(infiniteScroll?) {
        this.topicsService
            .loadPopularTopics(this.topics, this.topicsPage, res => {
                if (infiniteScroll)
                    infiniteScroll.complete();
            });
    }

    loadMorePosts(infiniteScroll) {
        this.topicsPage++;
        this.loadPosts(infiniteScroll);
    }


}
