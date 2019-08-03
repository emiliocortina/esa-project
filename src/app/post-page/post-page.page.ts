import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.page.html',
  styleUrls: ['./post-page.page.scss'],
})
export class PostPagePage implements OnInit, OnChanges ,OnDestroy {


  postId: string;
  private routerSubscription: any;

  constructor(private route: ActivatedRoute) { }

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
    // TODO load post
  }

}
