import { inject } from "aurelia-framework";
import { PostService } from "common/services/post-service";

@inject(PostService)
export class About {
  postService: PostService;
  tags: string[];
  archives: string[];
  errorTags: string;
  errorArchives: string;

  constructor(PostService: PostService) {
    this.postService = PostService;
  }

  attached(): void {
    this.errorTags = '';
    this.errorArchives = '';

    this.postService.allTags().then(data => {
      this.tags = data.tags;
    }).catch(error => {
      this.errorTags = error.message;
    });
    this.postService.allArchives().then(data => {
      this.archives = data.archives;
    }).catch(error => {
      this.errorArchives = error.message;
    });
  }
}
