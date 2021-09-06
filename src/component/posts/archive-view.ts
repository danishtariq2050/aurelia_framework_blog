import { inject } from "aurelia-framework";
import { PostService } from "common/services/post-service";
import { Post } from "model/post";
import { EventAggregator } from "aurelia-event-aggregator";

@inject(PostService, EventAggregator)
export class ArchiveView {
  postService: PostService;
  posts: Post[];
  archive: string;
  error: string;
  ea: EventAggregator;

  constructor(PostService: PostService, EventAggregator: EventAggregator) {
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  activate(params): void {
    this.error = '';
    this.archive = params.archive;

    this.postService.postsByArchive(this.archive).then(data => {
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

