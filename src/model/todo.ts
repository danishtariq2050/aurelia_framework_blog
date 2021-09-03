export class Todo {
  description: string;
  done: boolean;
  fullName: string;

  constructor(description: string, fullName: string) {
    this.description = description;
    this.done = false;
    this.fullName = fullName;
  }
}
