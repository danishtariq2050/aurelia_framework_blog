import { PostService } from "common/services/post-service";
import { AuthService } from "common/services/auth-service";
import { inject } from "aurelia-framework";
import { Post } from "model/post";
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from 'aurelia-router';

@inject(PostService, AuthService, EventAggregator)
export class View {
  postService: PostService;
  authService: AuthService;
  post: Post;
  error: string;
  router: Router;
  ea: EventAggregator;

  constructor(PostService: PostService, AuthService: AuthService, Router: Router, EventAggregator: EventAggregator) {
    this.postService = PostService;
    this.authService = AuthService;
    this.router = Router;
    this.ea = EventAggregator;
  }

  activate(params): void {
    this.error = '';
    this.postService.find(params.slug).then(data => {
      this.post = data["post"];
    }).catch(error => {
      this.ea.publish('toast', {
        type: 'error',
        message: error.message
      });
      this.router.navigateToRoute('home');
      // this.error = error.message
    })
  }
}
