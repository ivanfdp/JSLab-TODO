export class Todo {

  static fromJson({name, id, completed, createdAt}) {
    const tempTask = new Todo(name)

    tempTask.id        = id;
    tempTask.completed = completed;
    tempTask.createdAt = createdAt;

    return tempTask;
  }


  constructor(task) {
    this.name      = task;
    this.id        = new Date().getTime();
    this.completed = false;
    this.createdAt = new Date();
  }

}