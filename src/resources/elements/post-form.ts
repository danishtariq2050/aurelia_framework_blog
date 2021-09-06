import { bindable, inject } from 'aurelia-framework';
import { ValidationControllerFactory, validationMessages, ValidationRules } from 'aurelia-validation';
import { PostService } from 'common/services/post-service';
import { EventAggregator } from "aurelia-event-aggregator";

@inject(PostService, ValidationControllerFactory, EventAggregator)

export class PostForm {
  @bindable title;
  @bindable post;
  @bindable error;

  allTags: string[];
  newTag: string;
  postService: PostService;
  controller: any;
  ea: EventAggregator;
  // error: string;

  constructor(PostService: PostService, ValidationControllerFactory: ValidationControllerFactory, EventAggregator: EventAggregator) {
    this.postService = PostService;
    this.controller = ValidationControllerFactory.createForCurrentScope();
    this.ea = EventAggregator;
  }

  attached(): void {
    this.postService.allTags()
      .then(data => {
        this.allTags = data['tags'];
      }).catch(error => {
        this.ea.publish('toast', {
          type: 'error',
          message: error.message
        });
        // this.error = error.message
      })
  }

  submit() { }

  addTag(): void {
    this.allTags.push(this.newTag);
    this.post.tags.push(this.newTag);
    this.newTag = '';
  }

  postChanged(newValue, oldValue) {
    if (this.post) {
      validationMessages['required'] = 'You must enter a \${$displayName}.';
      ValidationRules
        // .ensure('title').required().withMessage('Please provide title for a Post')
        .ensure('title').displayName('Title').required().minLength(5)
        .ensure('body').displayName('Body').required()
        .on(this.post);

      this.controller.validate();
    }
  }
}
