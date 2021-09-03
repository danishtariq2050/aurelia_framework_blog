import { PostService } from "common/services/post-service";
import { inject } from "aurelia-framework";
import { Post } from "model/post";

@inject(PostService)
export class Index {
  postService: PostService;
  posts: Post[];
  error: string;

  constructor(PostService: PostService) {
    this.postService = PostService;
  }

  attached() {
    this.error = '';
    this.postService.allPostPreviews().then(data => {
      this.posts = data["posts"];
    }).catch(error => {
      this.error = error.message;
    });
  }
}
