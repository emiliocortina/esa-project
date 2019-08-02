import {Component, OnInit} from '@angular/core';
import {TopicsService} from '../services/topics.service';
import {Topic} from '../services/models/topic.model';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../services/models/category.model';

@Component({
    selector: 'app-tab1',
    templateUrl: 'posts.page.html',
    styleUrls: ['posts.page.scss']
})
export class PostsPage implements OnInit {

    topics: Topic[];


    categories: Category[];
    categoriesToggle: boolean;


    constructor(
            private topicsService: TopicsService, 
            private categoriesService: CategoriesService
            ){

        this.categories = this.categoriesService.getCategories();
    }

    ngOnInit(): void {
        this.topics = [];
        this.topicsService.loadPopularTopics(this.topics);
    }



    toggleShowCategories() : void
    {
        this.categoriesToggle = !this.categoriesToggle;
    }

    isShowingCategories() : boolean
    {
        return this.categoriesToggle;
    }
}
