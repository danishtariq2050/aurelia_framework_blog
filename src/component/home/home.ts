import { Todo } from "model/todo";

export class Home {
  // public message = 'Hello World! Can you see here!';
  // public todo = new Todo('Clean my Code!');

  public message: string;
  public todo: Todo;
  public todoList: Todo[];
  public newItem: string;

  constructor() {
    this.message = 'Hello World! Can you see here!';
    this.todo = new Todo('Clean my Code!', 'Danish Tariq');
    this.todo.done = true;
    this.todoList = [];
    this.initiliazeTodoList();
  }

  private initiliazeTodoList() {
    this.todoList.push(new Todo('React JS', 'Umair Ahmad'));
    this.todoList.push(new Todo('Vue JS', 'Yaseen Ali'));
    this.todoList.push(new Todo('Angular JS', 'Obaid Khan'));
    this.todoList.push(new Todo('Laravel', 'Asif Mahmood'));
  }

  addTodo(): void {
    if (this.newItem) {
      this.todoList.push(new Todo(this.newItem, 'Test'));
      this.newItem = '';
    }
  }

  removeTodo(todo: Todo): void {
    const index = this.todoList.indexOf(todo);
    if (index !== -1) {
      this.todoList.splice(index, 1);
    }
  }
}
