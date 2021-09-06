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

  attached(): void {
    this.post = {
      title: '',
      body: '',
      tags: []
    }
    this.title = 'Create Post'
  }

  createPost(): void {
    this.error = '';
    this.postService.create(this.post)
      .then(data => {
        this.ea.publish('post-updated', Date());
        this.ea.publish('toast', {
          type: 'success',
          message: 'Post has been created!'
        });
        this.router.navigateToRoute('post-view', { slug: data["slug"] })
      })
      .catch(error => {
        this.ea.publish('toast', {
          type: 'error',
          message: error.message
        });
        // this.error = error.message
      })
  }
}
