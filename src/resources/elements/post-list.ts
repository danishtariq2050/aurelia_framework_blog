import { bindable } from 'aurelia-framework';

export class PostList {
  @bindable error;
  @bindable posts;

  valueChanged(newValue, oldValue) {
    //
  }
}
