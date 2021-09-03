import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { PostService } from "common/services/post-service";
import { Post } from "model/post";
import { EventAggregator } from "aurelia-event-aggregator";

@inject(PostService, Router, EventAggregator)
export class Create {
  postService: PostService;
  post: Post;
  error: string;
  router: Router;
  ea: EventAggregator;
  title: string;

  constructor(PostService: PostService, Router: Router, EventAggregator: EventAggregator) {
    this.postService = PostService;
    this.router = Router;
    this.ea = EventAggregator;
  }

  activate(params): void {
    this.postService.find(params.slug)
      .then(data => {
        this.post = data["post"];
      })
      .catch(error => { this.error = error.message })
    this.title = 'Edit Post'
  }

  editPost(): void {
    this.error = '';
    this.postService.update(this.post)
      .then(data => {
        this.ea.publish('post-updated', Date());
        this.router.navigateToRoute('post-view', { slug: data["slug"] })
      })
      .catch(error => { this.error = error.message })
  }
}
