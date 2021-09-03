import { bindable, inject } from 'aurelia-framework';
import { PostService } from 'common/services/post-service';

@inject(PostService)

export class PostForm {
  @bindable title;
  @bindable post;
  @bindable error;

  allTags: string[];
  newTag: string;
  postService: PostService;
  // error: string;

  constructor(PostService: PostService) {
    this.postService = PostService;
  }

  attached(): void {
    this.postService.allTags()
      .then(data => {
        this.allTags = data['tags'];
      }).catch(error => {
        // this.error = error.message;
      })
  }

  submit() { }

  addTag(): void {
    this.allTags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag = '';
  }

  valueChanged(newValue, oldValue) {
    //
  }
}
