import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { PostService } from "common/services/post-service";
import { Post } from "model/post";

@inject(PostService, Router)
export class Create {
  postService: PostService;
  post: Post;
  error: string;
  router: Router;
  allTags: string[];

  constructor(PostService: PostService, Router: Router) {
    this.postService = PostService;
    this.router = Router;
  }

  attached(): void {
    this.post = {
      title: '',
      body: '',
      tags: []
    }
    this.postService.allTags()
      .then(data => {
        this.allTags = data['tags'];
      }).catch(error => {
        this.error = error.message;
      })
  }

  createPost(): void {
    this.error = '';
    this.postService.create(this.post)
      .then(data => {
        this.router.navigateToRoute('post-view', { slug: data["slug"] })
      })
      .catch(error => { this.error = error.message })
  }
}
