import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { PostService } from "common/services/post-service";
import { Post } from "model/post";
import { EventAggregator } from "aurelia-event-aggregator";
import { AuthService } from "common/services/auth-service";

@inject(PostService, Router, EventAggregator, AuthService)
export class Create {
  postService: PostService;
  post: Post;
  error: string;
  router: Router;
  ea: EventAggregator;
  title: string;
  authService: AuthService;

  constructor(PostService: PostService, Router: Router, EventAggregator: EventAggregator, AuthService: AuthService) {
    this.postService = PostService;
    this.router = Router;
    this.ea = EventAggregator;
    this.authService = AuthService;
  }

  activate(params): void {
    this.postService.find(params.slug)
      .then(data => {
        const dataPost = data["post"];
        if (dataPost.author !== this.authService.currentUser) {
          this.router.navigateToRoute('home');
        }
        this.post = dataPost;
      })
      .catch(error => { this.error = error.message })
    this.title = 'Edit Post'
  }

  editPost(): void {
    this.error = '';
    this.postService.update(this.post)
      .then(data => {
        this.ea.publish('post-updated', Date());
        this.router.navigateToRoute('post-view', { slug: data["slug"] })
      })
      .catch(error => { this.error = error.message })
  }
}
