import { inject } from "aurelia-framework";
import { PostService } from "common/services/post-service";
import { EventAggregator } from "aurelia-event-aggregator";

@inject(PostService)
export class About {
  postService: PostService;
  tags: string[];
  archives: string[];
  errorTags: string;
  errorArchives: string;
  ea: EventAggregator;
  // subscription: any;

  constructor(PostService: PostService, EventAggregator: EventAggregator) {
    this.postService = PostService;
    this.ea = EventAggregator;
  }

  attached(): void {
    this.updateSideBar();
    // this.subscription = this.ea.subscribe('post-updated', updatedAt => {
    //   this.updateSideBar();
    // })

  }

  updateSideBar(): void {
    this.errorTags = '';
    this.errorArchives = '';

    this.postService.allTags().then(data => {
      this.tags = data["tags"];
    }).catch(error => {
      this.errorTags = error.message;
    });
    this.postService.allArchives().then(data => {
      this.archives = data["archives"];
    }).catch(error => {
      this.errorArchives = error.message;
    });
  }

  // detached(): void {
  //   this.subscription.dispose();
  // }
}
