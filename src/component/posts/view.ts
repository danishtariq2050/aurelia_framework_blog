import { PostService } from "common/services/post-service";
import { inject } from "aurelia-framework";
import { Post } from "model/post";

@inject(PostService)
export class View {
  postService: PostService;
  post: Post;
  error: string;

  constructor(PostService: PostService) {
    this.postService = PostService;
  }

  activate(params): void {
    this.error = '';
    this.postService.find(params.slug).then(data => {
      this.post = data.post;
    }).catch(error => {
      this.error = error.message;
    });
  }
}
