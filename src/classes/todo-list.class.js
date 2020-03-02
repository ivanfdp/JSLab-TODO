import { Todo } from "./todo.class";

export class TodoList {

  constructor() {
    this.loadLocalStorage();
  }

  newTask(task) {
    this.tasks.push(task);
    this.saveLocalStorage();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== parseInt(id))
    this.saveLocalStorage();
  }

  toggleTask(id) {
    for (const task of this.tasks) {
      if (task.id === parseInt(id)) {
        task.completed = !task.completed;
        break;
      }
    }
    this.saveLocalStorage();
  }

  deleteCompleted() {
    this.tasks = this.tasks.filter((task) => !task.completed);
    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.checkCompleted();
  }

  loadLocalStorage() {
    this.tasks = (localStorage.getItem('tasks'))
                  ? JSON.parse(localStorage.getItem('tasks'))
                  : [];
    this.tasks = this.tasks.map( Todo.fromJson );
  }

  checkCompleted() {
    return this.tasks.filter(task => !task.completed).length;
  }


}