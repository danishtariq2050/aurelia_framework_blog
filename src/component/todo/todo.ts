export class Todo {
  fullName: string;
  description: string;

  activate(params): void {
    this.fullName = params.fullName;
    this.description = params.description;
  }
}
