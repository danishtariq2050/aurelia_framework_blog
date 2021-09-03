import { inject } from "aurelia-framework";
import { Router } from 'aurelia-router';
import { PostService } from "common/services/post-service";
import { Post } from "model/post";
import { EventAggregator } from "aurelia-event-aggregator";

@inject(PostService, Router, EventAggregator)
export class Create {
  postService: PostService;
  post: Post;
  error: string;
  newTag: string;
  router: Router;
  allTags: string[];
  ea: EventAggregator;

  constructor(PostService: PostService, Router: Router, EventAggregator: EventAggregator) {
    this.postService = PostService;
    this.router = Router;
    this.ea = EventAggregator;
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
        this.ea.publish('post-updated', Date());
        this.router.navigateToRoute('post-view', { slug: data["slug"] })
      })
      .catch(error => { this.error = error.message })
  }

  addTag(): void {
    this.allTags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag = '';
  }
}
