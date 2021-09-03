import { inject } from "aurelia-framework";
import { PostService } from "common/services/post-service";
import { Post } from "model/post";

@inject(PostService)
export class TagView {
  postService: PostService;
  posts: Post[];
  tag: string;
  error: string;

  constructor(PostService: PostService) {
    this.postService = PostService;
  }

  activate(params) {
    this.error = '';
    this.tag = params.tag;

    this.postService.postsByTag(this.tag).then(data => {
      this.posts = data["posts"];
    }).catch(error => {
      this.error = error.message;
    });
  }
}

