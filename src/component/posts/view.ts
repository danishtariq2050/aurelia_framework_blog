import { PostService } from "common/services/post-service";
import { AuthService } from "common/services/auth-service";
import { inject } from "aurelia-framework";
import { Post } from "model/post";

@inject(PostService, AuthService)
export class View {
  postService: PostService;
  authService: AuthService;
  post: Post;
  error: string;

  constructor(PostService: PostService, AuthService: AuthService) {
    this.postService = PostService;
    this.authService = AuthService;
  }

  activate(params): void {
    this.error = '';
    this.postService.find(params.slug).then(data => {
      this.post = data["post"];
    }).catch(error => {
      this.error = error.message;
    });
  }
}
