import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicsService } from '../services/topics.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.page.html',
  styleUrls: ['./post-page.page.scss'],
})
export class PostPagePage implements OnInit, OnChanges ,OnDestroy {


  postId: string;
  private routerSubscription: any;

  private title: string;

  constructor(private route: ActivatedRoute, private topicsService: TopicsService) { }

  ngOnInit()
  {
    this.routerSubscription = this.route
      .params
      .subscribe(params => {
        this.setPostId(params['id']);
      });
  }

  ngOnChanges() { }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }


  setPostId(id: string)
  {
    this.postId = id;

    let callback = res =>
      {
        this.title = res.title;
      };

    this.topicsService.getTopic(id, callback, () => {});
  }

}
