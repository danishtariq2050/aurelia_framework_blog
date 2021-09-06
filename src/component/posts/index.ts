import { PostService } from "common/services/post-service";
import { inject } from "aurelia-framework";
import { Post } from "model/post";
import { EventAggregator } from "aurelia-event-aggregator";

@inject(PostService, EventAggregator)
export class Index {
  postService: PostService;
  posts: Post[];
  error: string;
  ea: EventAggregator;

  constructor(PostService: PostService, EventAggregator: EventAggregator) {
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  attached(): void {
    this.error = '';
    this.postService.allPostPreviews().then(data => {
      this.posts = data["posts"];
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
      // this.error = error.message
    })
  }
}
