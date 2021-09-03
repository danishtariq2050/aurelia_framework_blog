import { inject } from "aurelia-framework";
import { PostService } from "common/services/post-service";
import { Post } from "model/post";

@inject(PostService)
export class ArchiveView {
  postService: PostService;
  posts: Post[];
  archive: string;
  error: string;

  constructor(PostService: PostService) {
    this.postService = PostService;
  }

  activate(params) {
    this.error = '';
    this.archive = params.archive;

    this.postService.postsByArchive(this.archive).then(data => {
      this.posts = data["posts"];
    }).catch(error => {
      this.error = error.message;
    });
  }
}

